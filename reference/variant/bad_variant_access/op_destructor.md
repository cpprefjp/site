# デストラクタ
* variant[meta header]
* std[meta namespace]
* bad_variant_access[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
virtual ~bad_variant_access();           // (1) C++17
constexpr virtual ~bad_variant_access(); // (1) C++26
```

## 概要
`bad_variant_access`オブジェクトを破棄する。


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
