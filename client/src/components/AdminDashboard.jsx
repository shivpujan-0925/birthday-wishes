import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Trash2,
  Plus,
  Save,
  Image as ImageIcon,
  MessageSquareHeart,
  Feather,
  LogOut,
  Sparkles,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi, contentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { logoutAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'wishes' | 'note'
  const [photos, setPhotos] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [noteText, setNoteText] = useState('');
  
  // Photo upload states
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  // Wish add states
  const [wishText, setWishText] = useState('');
  const [wishAuthor, setWishAuthor] = useState('');

  const [notification, setNotification] = useState('');

  const showFeedback = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const loadData = async () => {
    try {
      const [pRes, wRes, nRes] = await Promise.all([
        contentApi.getPhotos(),
        contentApi.getWishes(),
        contentApi.getNote()
      ]);
      setPhotos(pRes.data || []);
      setWishes(wRes.data || []);
      setNoteText(nRes.data?.text || '');
    } catch (err) {
      console.error('Failed to fetch data in admin dashboard', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Photo handlers
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!photoFile && !photoUrlInput) {
      alert('Please select an image file or paste an image URL.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    if (photoFile) formData.append('image', photoFile);
    if (photoUrlInput) formData.append('imageUrl', photoUrlInput);
    formData.append('caption', photoCaption);
    formData.append('order', photos.length + 1);

    try {
      const res = await adminApi.uploadPhoto(formData);
      setPhotos([...photos, res.data]);
      setPhotoFile(null);
      setPhotoUrlInput('');
      setPhotoCaption('');
      showFeedback('Photo uploaded successfully! 📸');
    } catch (err) {
      alert('Failed to upload photo: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo memory?')) return;
    try {
      await adminApi.deletePhoto(id);
      setPhotos(photos.filter((p) => p._id !== id));
      showFeedback('Photo deleted.');
    } catch (err) {
      alert('Failed to delete photo.');
    }
  };

  // Wish handlers
  const handleAddWish = async (e) => {
    e.preventDefault();
    if (!wishText) return;
    try {
      const res = await adminApi.addWish({ text: wishText, author: wishAuthor });
      setWishes([res.data, ...wishes]);
      setWishText('');
      setWishAuthor('');
      showFeedback('Wish message added! 🎉');
    } catch (err) {
      alert('Failed to add wish.');
    }
  };

  const handleDeleteWish = async (id) => {
    if (!window.confirm('Delete this wish?')) return;
    try {
      await adminApi.deleteWish(id);
      setWishes(wishes.filter((w) => w._id !== id));
      showFeedback('Wish removed.');
    } catch (err) {
      alert('Failed to delete wish.');
    }
  };

  // Note handler
  const handleSaveNote = async () => {
    try {
      await adminApi.updateNote({ text: noteText });
      showFeedback('Personal note updated successfully! 💌');
    } catch (err) {
      alert('Failed to update note.');
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-6xl mx-auto relative z-10">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2.5 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-600 transition-colors"
            title="View Live Site"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-serifTitle text-gray-800">
              Tanisha's Birthday Management
            </h1>
            <p className="text-xs text-gray-500">Live content updates & memory gallery</p>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium text-sm transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Live notification feedback */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium text-sm flex items-center gap-2 shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>{notification}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-3 mb-8 border-b border-pink-200/60 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-medium text-sm transition-all cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
              : 'glass-card hover:bg-white text-gray-700'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Photos ({photos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishes')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-medium text-sm transition-all cursor-pointer ${
            activeTab === 'wishes'
              ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
              : 'glass-card hover:bg-white text-gray-700'
          }`}
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>Wishes & Quotes ({wishes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('note')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-medium text-sm transition-all cursor-pointer ${
            activeTab === 'note'
              ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25'
              : 'glass-card hover:bg-white text-gray-700'
          }`}
        >
          <Feather className="w-4 h-4" />
          <span>Personal Letter</span>
        </button>
      </div>

      {/* Tab: Photos */}
      {activeTab === 'photos' && (
        <div className="space-y-8">
          {/* Upload Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-pink-500" />
              Upload New Photo Memory
            </h3>
            <form onSubmit={handleUploadPhoto} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Select File from Computer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files[0])}
                  className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Or Paste Online Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white/80 border border-gray-200 outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Caption / Memory Story
                </label>
                <input
                  type="text"
                  placeholder="Unforgettable smile! ✨"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white/80 border border-gray-200 outline-none focus:border-pink-500"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{uploading ? 'Uploading...' : 'Add to Birthday Gallery'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <div
                key={photo._id || idx}
                className="glass-card rounded-2xl overflow-hidden p-2 flex flex-col justify-between group relative"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 px-1 mb-2 font-medium">
                  {photo.caption || 'No caption'}
                </p>
                <div className="flex items-center justify-between border-t border-pink-100 pt-2 px-1">
                  <span className="text-[10px] text-gray-400 font-semibold">#{idx + 1}</span>
                  <button
                    onClick={() => handleDeletePhoto(photo._id)}
                    className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Wishes */}
      {activeTab === 'wishes' && (
        <div className="space-y-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-pink-500" />
              Add New Birthday Wish or Quote
            </h3>
            <form onSubmit={handleAddWish} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Wish / Blessing Text
                </label>
                <textarea
                  rows="3"
                  placeholder="May all your dreams sparkle like the stars..."
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl bg-white/80 border border-gray-200 outline-none focus:border-pink-500"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Author / Signed As
                </label>
                <input
                  type="text"
                  placeholder="Best Friend, Secret Admirer, etc."
                  value={wishAuthor}
                  onChange={(e) => setWishAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-white/80 border border-gray-200 outline-none focus:border-pink-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Wish</span>
                </button>
              </div>
            </form>
          </div>

          {/* Wishes List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishes.map((wish) => (
              <div
                key={wish._id}
                className="glass-card p-5 rounded-2xl flex flex-col justify-between"
              >
                <p className="text-sm text-gray-700 italic mb-4">"{wish.text}"</p>
                <div className="flex items-center justify-between border-t border-pink-100 pt-3">
                  <span className="text-xs font-semibold text-pink-600">{wish.author}</span>
                  <button
                    onClick={() => handleDeleteWish(wish._id)}
                    className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Personal Note */}
      {activeTab === 'note' && (
        <div className="glass-card p-6 sm:p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Feather className="w-5 h-5 text-purple-500" />
              Edit Personal Birthday Letter
            </h3>
            <span className="text-xs text-gray-400">Supports multiline formatting</span>
          </div>

          <textarea
            rows="12"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your custom heartfelt letter to Tanisha..."
            className="w-full p-4 rounded-2xl bg-white/90 border border-gray-200 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 font-sans text-base leading-relaxed text-gray-800 shadow-inner"
          />

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Letter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
