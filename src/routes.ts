import express, { Request, Response } from 'express';
import { MahasiswaCreateReq } from './interface';
import { Mahasiswa } from './models/mahasiswa';

const MahasiswaRouter = express.Router();

MahasiswaRouter.post('/', async (req: MahasiswaCreateReq, res: Response) => {
  try {
    const { nama, npm } = req.body;
    const mahasiswa = await Mahasiswa.findOneAndUpdate(
      { npm },
      { nama, npm },
      { runValidators: true, upsert: true, new: true }
    );
    if (!mahasiswa) throw Error('Not Found');

    return res.json({
      status: 'OK',
      nama: mahasiswa.nama,
      npm: mahasiswa.npm,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'NOT OK' });
  }
});

export default MahasiswaRouter;
