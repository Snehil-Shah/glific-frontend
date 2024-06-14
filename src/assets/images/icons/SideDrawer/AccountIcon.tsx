const SvgComponent = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none">
    <path
      fill={color}
      fillRule="evenodd"
      d="M5.743 11.625c-.9.321-1.714.76-2.443 1.318-.5-.586-.89-1.25-1.168-1.993a6.719 6.719 0 0 1-.418-2.379c0-1.9.668-3.517 2.004-4.853C5.054 2.382 6.67 1.714 8.57 1.714s3.518.668 4.854 2.004c1.189 1.189 1.849 2.601 1.98 4.237a5.975 5.975 0 0 1 1.735.833 8.346 8.346 0 0 0-.672-3.56 8.657 8.657 0 0 0-1.832-2.72A8.656 8.656 0 0 0 11.914.674 8.347 8.347 0 0 0 8.571 0c-1.185 0-2.3.225-3.342.675a8.656 8.656 0 0 0-2.722 1.832A8.656 8.656 0 0 0 .675 5.23 8.346 8.346 0 0 0 0 8.57c0 1.186.225 2.3.675 3.343a8.656 8.656 0 0 0 1.832 2.722 8.657 8.657 0 0 0 2.722 1.832 8.346 8.346 0 0 0 3.559.672 5.975 5.975 0 0 1-.833-1.737 6.603 6.603 0 0 1-1.526-.307 6.456 6.456 0 0 1-1.843-.953 6.453 6.453 0 0 1 1.843-.954c.429-.141.875-.238 1.34-.289.083-.619.262-1.208.52-1.753a8.3 8.3 0 0 0-2.546.478Zm5.043-3.15a6.02 6.02 0 0 0-1.03.728c-.36.15-.755.226-1.185.226-.842 0-1.553-.29-2.132-.868-.578-.579-.868-1.29-.868-2.132 0-.843.29-1.554.868-2.133.579-.578 1.29-.867 2.132-.867.843 0 1.554.289 2.133.867.578.579.867 1.29.867 2.133 0 .801-.261 1.484-.785 2.046ZM9.493 7.35c-.243.243-.55.364-.922.364-.371 0-.678-.121-.921-.364a1.249 1.249 0 0 1-.364-.921c0-.372.121-.679.364-.922s.55-.364.921-.364c.372 0 .679.121.922.364s.364.55.364.922c0 .371-.121.678-.364.921Z"
      clipRule="evenodd"
    />
    <path
      fill={color}
      d="M13.714 12.223c.303 0 .599.087.85.251a1.5 1.5 0 0 1 .565.669c.115.272.146.572.087.861-.06.29-.205.555-.42.764-.213.208-.486.35-.783.407a1.57 1.57 0 0 1-.884-.084 1.523 1.523 0 0 1-.688-.55 1.463 1.463 0 0 1-.258-.828c.002-.394.163-.773.45-1.052.287-.28.676-.437 1.081-.438Zm-3.305 1.49c.001.14.012.279.032.417l-.932.71a.211.211 0 0 0-.05.275l.881 1.482a.228.228 0 0 0 .27.092l1.096-.428c.228.17.478.313.743.422l.164 1.132c.009.051.036.097.076.13.04.034.091.053.144.054h1.763a.233.233 0 0 0 .142-.051.222.222 0 0 0 .078-.126l.164-1.133c.265-.108.515-.25.742-.423l1.096.429a.228.228 0 0 0 .152.002.221.221 0 0 0 .118-.094l.882-1.481a.211.211 0 0 0-.05-.276l-.932-.71c.02-.14.03-.281.031-.423 0-.139-.011-.278-.031-.416l.931-.71a.211.211 0 0 0 .05-.275l-.88-1.482a.228.228 0 0 0-.27-.092l-1.097.428a3.402 3.402 0 0 0-.742-.422l-.164-1.133a.22.22 0 0 0-.077-.13.232.232 0 0 0-.143-.053h-1.763a.233.233 0 0 0-.142.051.223.223 0 0 0-.078.126l-.164 1.133c-.266.108-.516.25-.744.423l-1.094-.429a.228.228 0 0 0-.153-.002.222.222 0 0 0-.118.094l-.881 1.482a.211.211 0 0 0 .05.275l.932.71c-.02.14-.03.281-.032.422Z"
    />
  </svg>
);
export default SvgComponent;