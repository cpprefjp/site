# __cpp_lib_replaceable_contract_violation_handler
* contracts[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

```cpp
#define __cpp_lib_replaceable_contract_violation_handler 202603L // 置き換えられる場合
#define __cpp_lib_replaceable_contract_violation_handler 0       // 置き換えられない場合
```

## 概要
[契約違反ハンドラ](/lang/cpp26/contracts.md)をユーザー定義の関数で置き換えられるかを検出する機能テストマクロ。

契約違反ハンドラを置き換えられるかどうかは処理系定義であり、置き換えられない処理系で置き換え用の関数`handle_contract_violation`を宣言したプログラムは不適格となる (診断不要)。宣言が存在するだけで不適格となるため、この判定はプリプロセスの段階で行う必要がある。そのために、このマクロが用意されている。

このマクロは、契約違反ハンドラを置き換えられる場合に`202603L`、置き換えられない場合に`0`と定義される。

## 備考
- このマクロは、[`<contracts>`](/reference/contracts.md)ヘッダと[`<version>`](/reference/version.md)ヘッダで定義される
- 契約アサーション (`pre`、`post`、`contract_assert`) の言語機能自体が使用できるかは、`__cpp_contracts`マクロで検出する

## 例
```cpp example
#include <contracts>
#include <iostream>

#if __cpp_lib_replaceable_contract_violation_handler
// 契約違反ハンドラを置き換えられる処理系でのみ、置き換え用の関数を定義する
void handle_contract_violation(const std::contracts::contract_violation& violation) {
  std::cout << "violated: " << violation.comment() << std::endl;
}
#endif

int main()
{
#if __cpp_lib_replaceable_contract_violation_handler
  std::cout << "replaceable" << std::endl;
#else
  std::cout << "not replaceable" << std::endl;
#endif
}
```
* __cpp_lib_replaceable_contract_violation_handler[color ff0000]
* violation.comment()[link contract_violation/comment.md]

### 出力例
```
replaceable
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [契約プログラミング](/lang/cpp26/contracts.md)
- [`contract_violation`](contract_violation.md)

## 参照
- [P3886R0 Wording for AT1-057](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3886r0.pdf)
    - C++26で、このマクロが追加された
