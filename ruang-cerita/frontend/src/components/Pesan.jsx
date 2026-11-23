// Kotak pesan sukses / galat. `isi` boleh string atau array string.
export default function Pesan({ jenis, isi }) {
  if (!isi || (Array.isArray(isi) && isi.length === 0)) return null;
  const daftar = [].concat(isi);
  return (
    <div className={`pesan ${jenis}`}>
      {daftar.length > 1 ? (
        <>
          <b>Data belum valid:</b>
          <ul>
            {daftar.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </>
      ) : (
        daftar[0]
      )}
    </div>
  );
}
