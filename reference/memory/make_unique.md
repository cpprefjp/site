# make_unique
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  unique_ptr<T> make_unique(Args&&... args);   // (1)

  template <class T>
  unique_ptr<T> make_unique(size_t n);         // (2)

  template <class T, class... Args>
  unspecified make_unique(Args&&...) = delete; // (3)
}
```
* unique_ptr[link unique_ptr.md]
* unspecified[italic]

## 概要
`unique_ptr`オブジェクトを構築する。

- (1) : 非配列型`T`のコンストラクタ引数を受け取り、`unique_ptr<T>`オブジェクトを構築する。
- (2) : 配列型`T`の要素数を受け取り、`unique_ptr<T>`オブジェクトを構築する。
- (3) : (1)に配列型が指定された場合に、許可されていないオーバー�ードとして宣言される。


## 戻り値
- (1) : `unique_ptr<T>(new T(`[`std::forward`](/reference/utility/forward.md)`<Args>(args)...))`
- (2) : `unique_ptr<T>(new` [`remove_extent_t`](/reference/type_traits/remove_extent.md)`<T>[n]())`


## 備考
- (1) : 型`T`が配列型である場合、この関数はオーバー�ード解決の候補に入ってはならない。
- (2), (3) : 型`T`が要素数不明の配列型でない場合、この関数はオーバー�ード解決の候補に入ってはならない。


## 例
```cpp example
#include <iostream>
#include <memory>
#include <utility>

int main()
{
  // (1)
  // 型Tのコンストラクタ引数を受け取ってunique_ptrオブジェクトを構築。
  //
  // ここでは、型std::pair<First, Second>のunique_ptrオブジェクトを構築するために、
  // First型とSecond型の引数を渡している。
  std::unique_ptr<std::pair<int, int>> p1 = std::make_unique<std::pair<int, int>>(3, 1);
  std::cout << p1->first << ':' << p1->second << std::endl;

  // (2)
  // 型T[]の要素数を受け取ってunique_ptr<T[]>オブジェクトを構築。
  //
  // ここでは、要素数3の、int型動的配列を構築している。
  std::unique_ptr<int[]> p2 = std::make_unique<int[]>(3);
  p2[0] = 1;
  p2[1] = 2;
  p2[3] = 3;
}
```
* std::make_unique[color ff0000]

### 出力
```
3:1
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.4
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015


## 参照
- [N3588 make_unique](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3588.htm)
- [N3656 make_unique (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3656.htm)

## 関連項目

- [`std::shared_ptr`の推論補助](/reference/memory/shared_ptr/op_deduction_guide.md)
