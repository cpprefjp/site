# operator bool
* ostream[meta header]
* std[meta namespace]
* basic_ostream::sentry[meta class]
* function[meta id-type]

```cpp
operator bool() const;              // C++03 まで
explicit operator bool() const;     // C++11 から
```

## 概要
出力処理の前処理が正常に完了したか否かを返す。

## 戻り値
本オブジェクトの構築時に出力処理の前処理が正常に完了していれば `true`、そうでなければ `false`。

## 参照
- [`(constructor)`](op_constructor.md)
