# デストラクタ
* exception[meta header]
* std[meta namespace]
* nested_exception[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
virtual ~nested_exception() = default;           // (1) C++11
constexpr virtual ~nested_exception() = default; // (1) C++26
```

## 概要
`nested_exception`オブジェクトを破棄する。


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
