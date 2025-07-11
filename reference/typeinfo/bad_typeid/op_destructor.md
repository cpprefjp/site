# デストラクタ
* typeinfo[meta header]
* std[meta namespace]
* bad_typeid[meta class]
* function[meta id-type]

```cpp
virtual ~bad_typeid();           // (1) C++03
constexpr virtual ~bad_typeid(); // (1) C++26
```

## 概要
`bad_typeid`オブジェクトを破棄する。


## 例外
投げない


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)
