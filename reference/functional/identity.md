# identity
* functional[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {

  struct identity {
    template<class T>
    constexpr T&& operator()(T&& t) const noexcept;

    using is_transparent = unspecified;
  };
}
```
* unspecified[italic]

## 概要

`identity`クラスは、受け取った引数をそのまま返す（恒等変換を行う）関数オブジェクトである。この恒等変換はC++の意味論においてのものであり、値そのもの及びCV修飾や値カテゴリも含めて引数をそのまま返す。

この関数オブジェクトは一切のメンバ変数を持たず、状態を保持しない。


## メンバ関数

| 名前         | 説明           | 対応バージョン |
|--------------|----------------|----------------|
| `operator()` | `return std::forward<T>(t);` | C++20          |


## メンバ型

| 名前                   | 説明                                                                                                                                                       | 対応バージョン |
|------------------------|--------------------------------|----------------|
| `is_transparent`       | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。| C++20          |

## 備考

これは主にRangeをとるアルゴリズムにおいて、カスタマイズ可能な射影操作のデフォルトとして利用される。

## 例

```cpp example
#include <iostream>
#include <functional>

//intを受け取ってその値と射影した値を足して返す
//デフォルトはnを2倍にする
template<typename Projection = std::identity>
auto f(int n, Projection proj = {}) -> int {
  return n + proj(n);
}

int main()
{
  //デフォルトの射影で呼び出し
  std::cout << f(10) << std::endl;
  //何も足さないようにカスタマイズ
  std::cout << f(10, [](int){return 0;}) << std::endl;
  //3倍にする
  std::cout << f(10, [](int m){return m + m;}) << std::endl;
}
```
* std::identity[color ff0000]

### 出力
```
20
10
30
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 1 [mark verified]

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
