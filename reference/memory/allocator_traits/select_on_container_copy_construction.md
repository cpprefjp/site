# select_on_container_copy_construction
* memory[meta header]
* std[meta namespace]
* allocator_traits[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
static Alloc select_on_container_copy_construction(const Alloc& a);                 // C++17 まで
static constexpr Alloc select_on_container_copy_construction(const Alloc& a);       // C++20 から
```

## 概要
コンテナのコピー構築に使用するア�ケータオブジェクトを取得する。


## 戻り値
`a.select_on_container_copy_construction()`という式が有効ならその戻り値を返し、そうでなければデフォルト実装として`a`を返す。


## 備考
この関数は、標準コンテナのコピーコンストラクタで呼び出され、この関数の戻り値であるア�ケータオブジェクトを、コピーに必要なメモリ確保・解放、オブジェクトの構築・破棄に使用する。


## 例
```cpp example
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
    alloc_ = alloc; // 受け取ったア�ケータをメンバ変数に保持する

    // 受け取ったア�ケータでメモリ確保
    using traits = std::allocator_traits<Alloc>;
    size_ = other.size_;
    data_ = traits::allocate(alloc_, size_);

    for (std::size_t i = 0; i < size_; ++i) {
      traits::construct(alloc_, &data_[i], other.data_[i]);
    }
  }

  // コピー構築に使用するア�ケータオブジェクトを取得し、
  // ア�ケータを受け取るコピーコンストラクタに移�
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
* std::allocator[link /reference/memory/allocator.md]
* traits::allocate[link allocate.md]
* traits::construct[link construct.md]
* traits::destroy[link destroy.md]
* traits::deallocate[link deallocate.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [P0784R7 More constexpr containers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0784r7.html)
