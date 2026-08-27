# operator bool
* ostream[meta header]
* std[meta namespace]
* basic_ostream::sentry[meta class]
* function[meta id-type]

```cpp
operator bool() const;          // (1) C++98
explicit operator bool() const; // (1) C++11
```

## 概要
出力処理の前処理が正常に完了したか否かを返す。

## 戻り値
本オブジェクトの構築時に出力処理の前処理が正常に完了していれば `true`、そうでなければ `false`。


## バージョン
### 言語
- C++98


## 関連項目
- [`(constructor)`](op_constructor.md)
