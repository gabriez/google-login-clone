import React, { useEffect, useRef, useState } from "react";

interface Cat {
	x: number;
	y: number;
	z: number;
	r: number; // rotate speed
	d: number; // rotate direction
	a: number; // alpha opacity
	i: HTMLImageElement; // image
}

const Hacked: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [audioStarted, setAudioStarted] = useState<boolean>(false);
	const animationRef = useRef<number | null>(null);
	const catsRef = useRef<Cat[]>([]);
	const catImagesRef = useRef<HTMLImageElement[]>([]);
	const backgroundsRef = useRef<HTMLImageElement[]>([]);
	const canvasDeepRef = useRef<number>(0);

	const cat_assets: string[] = [
		"https://files.catbox.moe/umug2j.png",
		"https://files.catbox.moe/xamifa.png",
		"https://files.catbox.moe/whypxb.png",
		"https://files.catbox.moe/zvz83i.png",
		"https://files.catbox.moe/51k70l.png",
		"https://files.catbox.moe/0wtrhj.png",
	];

	const bg_assets: string[] = ["https://files.catbox.moe/eescve.jpg"];

	const rnd = (min: number, max: number): number => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const preloadImages = (
		inputUrls: string[],
		outputArray: HTMLImageElement[],
		callback: () => void
	): void => {
		let assetsLoaded = 0;
		inputUrls.forEach((url: string, index: number) => {
			const img = new Image();
			img.onload = () => {
				assetsLoaded++;
				if (assetsLoaded === inputUrls.length) {
					callback();
				}
			};
			img.onerror = () => {
				assetsLoaded++;
				if (assetsLoaded === inputUrls.length) {
					callback();
				}
			};
			img.src = url;
			outputArray[index] = img;
		});
	};

	const drawImageProp = (
		ctx: CanvasRenderingContext2D,
		img: HTMLImageElement,
		x?: number,
		y?: number,
		w?: number,
		h?: number,
		offsetX: number = 0.5,
		offsetY: number = 0.5
	): void => {
		// If only ctx and img are provided, use full canvas
		if (
			x === undefined &&
			y === undefined &&
			w === undefined &&
			h === undefined
		) {
			x = y = 0;
			w = ctx.canvas.width;
			h = ctx.canvas.height;
		}

		// Ensure all parameters are defined
		x = x ?? 0;
		y = y ?? 0;
		w = w ?? ctx.canvas.width;
		h = h ?? ctx.canvas.height;

		// keep bounds [0.0, 1.0]
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		if (offsetX > 1) offsetX = 1;
		if (offsetY > 1) offsetY = 1;

		const iw: number = img.width;
		const ih: number = img.height;
		let r: number = Math.min(w / iw, h / ih);
		let nw: number = iw * r; // new prop. width
		let nh: number = ih * r; // new prop. height
		let ar: number = 1;

		// decide which gap to fill
		if (nw < w) ar = w / nw;
		if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
		nw *= ar;
		nh *= ar;

		// calc source rectangle
		let cw: number = iw / (nw / w);
		let ch: number = ih / (nh / h);
		let cx: number = (iw - cw) * offsetX;
		let cy: number = (ih - ch) * offsetY;

		// make sure source rectangle is valid
		if (cx < 0) cx = 0;
		if (cy < 0) cy = 0;
		if (cw > iw) cw = iw;
		if (ch > ih) ch = ih;

		// fill image in dest. rectangle
		ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
	};

	const randomizeCats = (maxCats: number): void => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const cats: Cat[] = [];
		for (let i = 0; i < maxCats; i++) {
			cats.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				z: Math.random() * canvasDeepRef.current,
				r: rnd(16, 64), // rotate speed
				d: Math.random() < 0.5 ? -1 : 1, // rotate direction
				a: 0, // initial alpha opacity
				i: catImagesRef.current[rnd(0, catImagesRef.current.length - 1)], // random image
			});
		}
		catsRef.current = cats;
	};

	const animate = (): void => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.globalAlpha = 1.0;
		drawImageProp(
			ctx,
			backgroundsRef.current[0],
			0,
			0,
			canvas.width,
			canvas.height
		);
		ctx.globalAlpha = 1.0;
		ctx.imageSmoothingQuality = "high";

		catsRef.current.forEach((cat: Cat) => {
			let x: number = (cat.x - canvas.width / 2) / cat.z;
			let y: number = (cat.y - canvas.height / 2) / cat.z;

			x += canvas.width / 2;
			y += canvas.height / 2;

			ctx.save();
			ctx.translate(x, y);

			let scale: number = 1 - (x / canvas.width) * 2;
			ctx.scale(scale, scale);

			ctx.rotate((Math.PI / 180) * ((cat.z * x) / (cat.r * cat.d)));

			cat.a += 1 - canvas.width / 100 + canvasDeepRef.current * (cat.z / 100);

			ctx.globalAlpha = cat.a;
			ctx.drawImage(cat.i, 0, 0);
			ctx.globalAlpha = 1.0;
			ctx.restore();

			cat.z -= 0.025;

			if (cat.z <= 0) {
				cat.z = canvasDeepRef.current;
				cat.x = Math.random() * canvas.width;
				cat.y = Math.random() * canvas.height;
				cat.a = 0;
			}
		});

		animationRef.current = requestAnimationFrame(animate);
	};

	const startAudio = (): void => {
		if (audioRef.current && !audioStarted) {
			audioRef.current.play().catch((error) => {
				console.log("Audio play failed:", error);
			});
			setAudioStarted(true);
		}
	};

	const handleUserInteraction = (): void => {
		startAudio();
	};

	const handleResize = (): void => {
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvasDeepRef.current = window.innerWidth / 32;
		}
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvasDeepRef.current = window.innerWidth / 32;

		// Preload background images first
		preloadImages(bg_assets, backgroundsRef.current, () => {
			// Then preload cat images
			preloadImages(cat_assets, catImagesRef.current, () => {
				// When cats are loaded, randomize array with max_cats value
				randomizeCats(100);
				setIsLoaded(true);
				// Start animation
				animate();
			});
		});

		// Add resize listener
		window.addEventListener("resize", handleResize);

		// Add user interaction listeners to start audio
		document.addEventListener("click", handleUserInteraction);
		document.addEventListener("keydown", handleUserInteraction);
		document.addEventListener("touchstart", handleUserInteraction);

		// Try to start audio immediately (might fail due to browser policies)
		startAudio();

		// Cleanup
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("click", handleUserInteraction);
			document.removeEventListener("keydown", handleUserInteraction);
			document.removeEventListener("touchstart", handleUserInteraction);
		};
	}, []);

	return (
		<>
			<audio ref={audioRef} loop className="hidden">
				<source src="/Voicy_Rickroll.mp3" type="audio/mpeg" />
			</audio>
			<div className="w-screen h-screen m-0 p-0 bg-black overflow-hidden relative">
				{!isLoaded && (
					<div
						className="absolute inset-0 bg-black flex items-center justify-center"
						style={
							{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin:auto;background:transparent;display:block;' width='64px' height='64px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cpath d='M34 50A16 16 0 0 0 66 50A16 18 0 0 1 34 50' fill='%23fff' stroke='none'%3E%3CanimateTransform attributeName='transform' type='rotate' dur='1s' repeatCount='indefinite' keyTimes='0;1' values='0 50 51;360 50 51'%3E%3C/animateTransform%3E%3C/path%3E%3C/svg%3E")`,
								backgroundRepeat: "no-repeat",
								backgroundPosition: "center",
								backgroundSize: "10vw",
							} as React.CSSProperties
						}
					/>
				)}
				<canvas
					ref={canvasRef}
					className={`w-full h-full transition-opacity duration-1000 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}
				/>
			</div>
		</>
	);
};

export default Hacked;
