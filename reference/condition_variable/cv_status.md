# cv_status
* condition_variable[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  enum class cv_status {
    no_timeout,
    timeout
  };
}
```

## 概要
条件変数の待機結果値。

`cv_status`列挙型は、[`condition_variable`](/reference/condition_variable/condition_variable.md)/[`condition_variable_any`](/reference/condition_variable/condition_variable_any.md)クラスにおけるタイムアウト時間を指定する待機関数`wait_for()`/`wait_until()`での実行結果として使用する。

各値は以下の意味を持つ：

| 列挙値 | 説明 |
|--------------|----------------------------------------|
| `no_timeout` | タイムアウトすることなく待機が完了した |
| `timeout`    | 待機処理がタイムアウトした             |


## 例
```cpp
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 (partial), 2013
	- 2012までは、スコープ付き列挙体(`enum class`)に対応していないため、代わりに名前空間`std::cv_status`に`enum cv_status`を定義する形になっている。


## 参照


