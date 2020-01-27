# コンストラクタ
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
scoped_allocator_adaptor();                                                 // (1)

template <class OuterA2>
scoped_allocator_adaptor(
  OuterA2&& outerAlloc,
  const InnerAllocs&... innerAllocs) noexcept;                              // (2)

scoped_allocator_adaptor(
  const scoped_allocator_adaptor& other) noexcept;                          // (3)

scoped_allocator_adaptor(
  scoped_allocator_adaptor&& other) noexcept;                               // (4)

template <class OuterA2>
scoped_allocator_adaptor(
  const scoped_allocator_adaptor<OuterA2, InnerAllocs...>& other) noexcept; // (5)

template <class OuterA2>
scoped_allocator_adaptor(
  scoped_allocator_adaptor<OuterA2, InnerAllocs...>&& other) noexcept;      // (6)
```

## scoped_allocator_adaptorオブジェクトの構築
- (1) : デフォルト構築。各ア�ケータオブジェクトを値初期化する。
- (2) : 外側のア�ケータ、内側のア�ケータという順番で、各ア�ケータオブジェクトを受け取る。
- (3) : コピー構築。`other`が持つア�ケータオブジェクトを`*this`にコピーする。
- (4) : ムーブ構築。`other`が持つア�ケータオブジェクトを`*this`にムーブする。
- (5) : 変換可能な外側のア�ケータを持つ`scoped_allocator_adaptor`オブジェクトからのコピー構築。
- (6) : 変換可能な外側のア�ケータを持つ`scoped_allocator_adaptor`オブジェクトからのムーブ構築。


## 要件
- (2), (5), (6) : クラステンプレートのパラメータ`OuterAlloc`は、テンプレートパラメータの型`OuterA2`から構築可能であること。


## 効果
- (1) : 外側と内側のア�ケータオブジェクトを値初期化する。
- (2) : 外側のア�ケータを[`std::forward`](/reference/utility/forward.md)`<OuterA2>(outerAlloc)`でムーブ構築する。内側のア�ケータオブジェクトはコピー構築する。
- (3) : `other`が持つア�ケータオブジェクトを、`*this`の対応する各ア�ケータオブジェクトにコピーする。
- (4) : `other`が持つア�ケータオブジェクトを、`*this`の対応する各ア�ケータオブジェクトにムーブする。
- (5) : `other`が持つア�ケータオブジェクトを、`*this`の対応する各ア�ケータオブジェクトにコピーする。
- (6) : `other`が持つア�ケータオブジェクトを、`*this`の対応する各ア�ケータオブジェクトにムーブする。



## 例
```cpp example
#include <iostream>
#include <vector>
#include <string>
#include <scoped_allocator>

template <class T>
using alloc_t = std::allocator<T>;

// コンテナの要素(Inner)
using string = std::basic_string<
  char,
  std::char_traits<char>,
  alloc_t<char>
>;

// コンテナ(Outer)
template <class T>
using vector = std::vector<
  T,
  std::scoped_allocator_adaptor<alloc_t<T>, alloc_t<typename T::value_type>>
>;

int main()
{
  // (1)
  // デフォルト構築。
  // 各ア�ケータを値初期化する。
  vector<string>::allocator_type alloc1;

  // (2)
  // 外側のア�ケータと内側のア�ケータ、それぞれを渡す
  vector<string>::allocator_type alloc2 {
    alloc_t<string>(), // vector自体のア�ケータオブジェクト
    alloc_t<char>()    // vectorの全ての要素に使用するア�ケータオブジェクト
  };

  // (3)
  // コピー構築。対応するア�ケータオブジェクトにコピーする。
  vector<string>::allocator_type alloc3 = alloc2;

  // (4)
  // ムーブ構築。対応するア�ケータオブジェクトにムーブする。
  vector<string>::allocator_type alloc4 = std::move(alloc3);
}
```
* std::allocator[link /reference/memory/allocator.md]
* std::basic_string[link /reference/string/basic_string.md]
* std::char_traits[link /reference/string/char_traits.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.7.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
