# emplace
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
template <class... Args>
T& emplace(Args&&... args);                              // (1)

template <class U, class... Args>
T& emplace(std::initializer_list<U> il, Args&&... args); // (2)
```

## 概要
要素型のコンストラクタ引数から直接構築する。

- (1) : 可変個の引数をとり、それを型`T`のコンストラクタ引数として渡して、この関数内で型`T`の有効値を構築して保持する
- (2) : 初期化子リストと可変個の引数をとり、それらを型`T`のコンストラクタ引数として渡して、この関数内で型`T`の有効値を構築して保持する


## 要件
- (1) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<T, Args&&...> == true`であること


## 効果
まず、共通の動作として、[`reset()`](reset.md)メンバ関数を呼び出す。

- (1) : 型`T`の有効値を、[`std::forward<Args>`](/reference/utility/forward.md)`(args)...`を引数として構築する
- (2) : 型`T`の有効値を、`ilと`[`std::forward<Args>`](/reference/utility/forward.md)`(args)...`を引数として構築する


## 戻り値
代入された有効値への参照を返す。


## 例外
型`T`の選択されたコンストラクタが、任意の例外を送出する可能性がある。


## 例外安全性
型`T`のコンストラクタが例外を送出した場合、`*this`は有効値を含まない状態となり、元々保持していた有効値は破棄される。


## 備考
- (2) : このオーバーロードは主に、コンテナをアロケータ付きで、初期化子リスト代入するためにある


## 例
```cpp
#include <iostream>
#include <optional>
#include <string>
#include <vector>

int main()
{
  // (1)
  {
    std::optional<std::string> p;

    // std::stringのコンストラクタ引数を渡して、
    // emplace関数内でstringオブジェクトを構築する。
    p.emplace(3, 'A');
    std::cout << "(1) : " << p.value() << std::endl;
  }

  // (2)
  {
    std::optional<std::vector<int>> p;

    // 初期化子リストとアロケータから、
    // emplace関数内でvectorオブジェクトを構築する。
    std::allocator<int> alloc;
    p.emplace({3, 1, 4}, alloc);

    std::cout << "(2) :" << std::endl;
    for (int x : p.value()) {
      std::cout << "  " << x << std::endl;
    }
  }
}
```
* emplace[color ff0000]
* p.value()[link value.md]

### 出力
```
(1) : AAA
(2) :
  3
  1
  4
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3406 A proposal to add a utility class to represent optional objects (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3406.html)
- [LWG Issue 2857. {`variant`,`optional`,`any`}`::emplace` should return the constructed value](https://wg21.cmeerw.net/lwg/issue2857)
- [P0084R2 Emplace Return Type (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0084r2.pdf)
