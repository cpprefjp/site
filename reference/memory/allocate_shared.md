#allocate_shared (C++11)
* memory[meta header]

```cpp
namespace std {
  template<class T, class A, class... Args>
  shared_ptr<T> allocate_shared(const A& a, Args&&... args);
}
```

##概要
`class T` に対する `shared_ptr<T>`オブジェクト を作成し返却する。
このとき、`args...` で受け取った引数リストを型 `T` の作成時コンストラクタへ渡して作成する。
また、`shared_ptr` 構築に必要なメモリのアロケートおよびデアロケートを第一引数のアロケータで行う。

一般的にアロケータは型 `T` のサイズより大きいサイズのアロケートを要求される。
これは、[`make_shared`](/reference/memory/shared_ptr/make_shared.md) と同様に型 `T` と `shared_ptr` の管理領域を1つの大きなブロックとしてアロケートすることが実装に推奨されているためである。

また、コピー不可能なクラスもムーブによって引数リストへ渡すことが可能である。

##例
```cpp
#include <memory>
#include <iostream>
 
int main() {
 std::allocator<int>  alloc;
 std::shared_ptr<int> sp = std::allocate_shared<int>(alloc, 42);
  if(sp) {
    std::cout << *sp << std::endl;
  }
}
```

###出力
```
42
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.2, 3.3
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.3, 4.8.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
	- Visual C++ 11.0までは、可変引数テンプレートに対応していないため、不完全な実装である。

##参照
- [`std::make_shared`](/reference/memory/shared_ptr/make_shared.md)
