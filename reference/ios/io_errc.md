# io_errc
* ios[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  enum class io_errc {
    stream = 1
  };
}
```

## 概要
入出力操作に関するエラーの種別を表す列挙型。エラーのカテゴリは [`iostream_category`](iostream_category.md)`()` で取得できる。  
[`is_error_code_enum`](is_error_code_enum.md) の特殊化がされていることからわかるように、本列挙型は [`error_code`](../system_error/error_code.md) として使うことを意図しており、暗黙的に [`error_code`](../system_error/error_code.md) への変換が可能である。  
なお、[`is_error_condition_enum`](../system_error/is_error_condition_enum.md) の特殊化はされていないため、本列挙型から [`error_condition`](../system_error/error_condition.md) に暗黙的に変換する事は出来ないが、[`make_eror_condtion`](make_error_condition.md)`()` の呼び出し、および、一旦 [`error_code`](../system_error/error_code.md) に変換してから [`error_code`](../system_error/error_code.md)`::`[`default_error_condition`](../system_error/error_code/default_error_condition.md) を使用して変換する、などが可能である。


列挙値は唯一 `stream` のみが定義されている。

| 列挙値   | 説明                                               |
|----------|----------------------------------------------------|
| `stream` | ストリームライブラリ内でエラーが発生したことを表す |


## 備考
本列挙型は [`ios_base`](ios_base.md)`::`[`failure`](ios_base/failure.md) 例外の送出の際に使用される。  


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5.0, 3.6.0, 3.7.0, 3.8.0
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc): 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0 (ただし、10.0はenum class非対応のため不完全)


## 参照
- [`iostream_category`](iostream_category.md)
- [`is_error_code_enum`](is_error_code_enum.md)
- [`make_error_code`](make_error_code.md)
- [`make_error_condition`](make_error_condition.md)
- [`error_code`](../system_error/error_code.md)
- [`error_code`](../system_error/error_code.md)`::`[`error_code`](../system_error/error_code/op_constructor.md)
- [`ios_base`](ios_base.md)`::`[`failure`](ios_base/failure.md)
