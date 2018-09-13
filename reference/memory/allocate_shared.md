# allocate_shared
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class T, class Alloc, class... Args>
  shared_ptr<T> allocate_shared(const Alloc& alloc, Args&&... args);
}
```
* shared_ptr[link shared_ptr.md]

## 概要
`class T` に対する [`shared_ptr`](shared_ptr.md)`<T>`オブジェクト を作成し返却する。

このとき、`args...` で受け取った引数リストを型 `T` の作成時コンストラクタへ渡して作成する。

また、[`shared_ptr`](shared_ptr.md) 構築に必要なメモリのアロケートおよびデアロケートを第一引数のアロケータで行う。

一般的にアロケータは型 `T` のサイズより大きいサイズのアロケートを要求される。

これは、[`make_shared`](/reference/memory/make_shared.md) と同様に型 `T` と [`shared_ptr`](shared_ptr.md) の管理領域を1つの大きなブロックとしてアロケートすることが実装に推奨されているためである。

また、コピー不可能なクラスもムーブによって引数リストへ渡すことが可能である。


## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  std::allocator<int> alloc;
  std::shared_ptr<int> sp = std::allocate_shared<int>(alloc, 42);
  if (sp) {
    std::cout << *sp << std::endl;
  }
}
```
* std::allocate_shared[color ff0000]
* std::allocator[link allocator.md]

### 出力
```
42
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2, 3.3
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.3, 4.8.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
    - 2012までは、可変引数テンプレートに対応していないため、不完全な実装である。

## 関連項目
- [`std::make_shared`](/reference/memory/make_shared.md)

