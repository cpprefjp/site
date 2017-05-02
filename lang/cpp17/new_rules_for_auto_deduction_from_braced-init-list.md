# 波括弧初期化の型推論の新規則
* cpp17[meta cpp]

## 概要

これまでは `auto var{arg};` (単一要素), `auto var{arg1, arg2,...};` (複数要素) で `var` はいずれも
`std::initilizer_list<T>` に推論されたが、
C++17 で規則が変更され、前者は `T`，後者は不適格となった。


## 仕様

リストによる直接初期化 (direct-list-initialization) で型推論する場合、

* 初期化節が単一であれば型を `T` に推論 (`template` の型推論と同じ規則を用いる)
* そうでなければ不適格

リストによるコピー初期化 (copy-list-initialization) の型推論の規則や非 `auto` の初期化セマンティクスに変更はない。

従来通り `initilizer_list` を使いたい場合はコピー初期化を利用する。

**推論される型**

| リスト初期化 | 単一初期化子 | 複数初期化子 |
|:----|:----:|:----:|
| 直接 (C++17 まで)   | `std::initializer_list<T>` | `std::initializer_list<T>` |
| 直接 (C++17 以降)   | `T` | 不適格 |
| コピー (C++17 まで) | `std::initializer_list<T>` | `std::initializer_list<T>` |
| コピー (C++17 以降) | `std::initializer_list<T>` | `std::initializer_list<T>` |


## 例
```cpp
#include <iostream>
#include <typeindex>

int main()
{
  // リストによるコピー初期化の型推論はこれまで通り
  auto assign_brace_single = {0};      // std::initilizer_list<int>
  auto assign_brace_multi  = {0, 1};   // std::initilizer_list<int>
  // auto assign_brace_bad = {0, 1.0}; // 不適格: int と double からは推論できない

  // リストによる直接初期化の型推論の規則が変更された
  auto brace_init_single{0};           // C++17 までは std::initilizer_list<int>, C++17 からは int
  // auto brace_init_multi{0, 1};      // C++17 までは std::initilizer_list<int>, C++17 からは 不適格

  std::cout << typeid(assign_brace_single).name() << '\n';
  std::cout << typeid(assign_brace_multi).name() << '\n';
  std::cout << typeid(brace_init_single).name() << '\n';
  // std::cout << typeid(brace_init_multi).name() << '\n';
}
```

### 出力例
```
St16initializer_listIiE
St16initializer_listIiE
i
```


## この機能が必要になった背景・経緯

[ラムダ式の初期化キャプチャ](/lang/cpp14/initialize_capture.md) で変数をリストによって直接初期化した場合、
`std::initializer_list` に型が推論された:
```cpp
[n{0}]() {};    // 直接初期化; n は std::initilizer_list<int>
[n = {0}]() {}; // コピー初期化; n は std::initilizer_list<int>
```

これは不便だと考えられたため、直接初期化での型推論の規則が変更された。

## 検討されたほかの選択肢

リストによる直接初期化とコピー初期化を区別せず、初期化節が単一の場合にのみ型推論することが提案された。

また、初期化リストで `initializer_list` に推論しないこと([FI3](https://isocpp.org/files/papers/n3852.html#FI3))
が提案されたが採用されなかった。


## 関連項目

* [C++11 初期化リスト](/lang/cpp11/initializer_lists.md)


## 参照

* [N3681 Auto and braced-init-lists](http://open-std.org/JTC1/SC22/WG21/docs/papers/2013/n3681.html)
* [N3912 Auto and braced-init-lists, continued](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3912.html)
* [N3922 New Rules for auto deduction from braced-init-list](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3922.html)
