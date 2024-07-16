# new式での配列要素数の推論 [P1009R2]

* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++20では、`new`式で配列の要素数を推論できる。

```cpp
// C++20
double a[3] {1,2,3};               // OK
double a[] {1,2,3};                // OK
double* p = new double[3]{1,2,3};  // OK
double* p = new double[]{1,2,3};   // OK (P1009R2非対応の環境ではエラー)
double* p = new double[](1,2,3);   // OK (丸カッコでの集成体初期化:C++20)
char*   p = new char[]{"hello"};   // OK (P1009R2非対応の環境ではエラー)
```

要素数が推論できない場合、エラーとなる。

```cpp
// C++20
double a[];               // エラー
double* p = new double[]; // エラー
```

この変更(P1009R2)は過去すべてのC++規格に遡って適用された。そのため、P1009R2に対応した環境では、言語バージョンにかかわらず使用できる。
また、clangは以前から独自にサポートしていた。

## 例
```cpp example
#include <iostream>

int main()
{
  int* a = new int[]{1, 2, 3};
  for (int i = 0; i < 3; ++i) {
    std::cout << a[i] << '\n';
  }
  delete[] a;
}
```

### 出力
```
1
2
3
```

## この機能が必要になった背景・経緯

`new`式での配列要素数は文法上必須となっていて省略することができなかったが、通常の配列の宣言では要素数を省略できるので一貫性がなかった。

```cpp
// C++17
double a[3] {1,2,3}               // OK
double a[] {1,2,3}                // OK
double* p = new double[3]{1,2,3}  // OK
double* p = new double[]{1,2,3}   // エラー
```

`new`式で要素数を必須とする強い理由がないため、推論できるようになった。

## <a id="relative-page" href="#relative-page">関連項目</a>

* [丸カッコの値リストからの集成体初期化を許可](allow_initializing_aggregates_from_a_parenthesized_list_of_values.md)

## 参照

* [P1009R2 Array size deduction in new-expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1009r2.pdf)