#select_on_container_copy_construction(C++11)
```cpp
static Alloc select_on_container_copy_construction(const Alloc& a);
```

##概要
コンテナのコピー構築に使用するアロケータオブジェクトを取得する。


##戻り値
`a.select_on_container_copy_construction()`という式が有効ならその戻り値を返し、そうでなければデフォルト実装として`a`を返す。


##備考
この関数は、標準コンテナのコピーコンストラクタで呼び出され、この関数の戻り値であるアロケータオブジェクトを、コピーに必要なメモリ確保・解放、オブジェクトの構築・破棄に使用する。


##例
```cpp
#include <iostream>
#include <memory>

template <class T, class Alloc>
class MyVector {
  T* data_;
  std::size_t size_;
  Alloc alloc_;
public:
  MyVector()
    : data_(nullptr), size_(0) {}

  MyVector(std::size_t size)
  {
    using traits = std::allocator_traits<Alloc>;

    size_ = size;
    data_ = traits::allocate(alloc_, size);

    for (std::size_t i = 0; i < size_; ++i) {
      traits::construct(alloc_, &data_[i]);
    }
  }

  MyVector(const MyVector& other, Alloc alloc)
  {
    alloc_ = alloc; // 受け取ったアロケータをメンバ変数に保持する
      
    // 受け取ったアロケータでメモリ確保
    using traits = std::allocator_traits<Alloc>;
    size_ = other.size_;
    data_ = traits::allocate(alloc_, size_);

    for (std::size_t i = 0; i < size_; ++i) {
      traits::construct(alloc_, &data_[i], other.data_[i]);
    }
  }

  // コピー構築に使用するアロケータオブジェクトを取得し、
  // アロケータを受け取るコピーコンストラクタに移譲
  MyVector(const MyVector& other)
    : MyVector(
        other,
        std::allocator_traits<Alloc>::select_on_container_copy_construction(alloc_)) {}

  ~MyVector()
  {
    release();
  }

private:
  void release()
  {
    if (!data_)
      return;

    using traits = std::allocator_traits<Alloc>;

    // 要素を破棄
    for (std::size_t i = 0; i < size_; ++i) {
      traits::destroy(alloc_, &data_[i]);
    }

    // メモリを解放
    traits::deallocate(alloc_, data_, size_);
      
    size_ = 0;
    data_ = nullptr;
  }
};

int main()
{
  MyVector<int, std::allocator<int>> a;
  MyVector<int, std::allocator<int>> b = a;
}
```
* select_on_container_copy_construction[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??
