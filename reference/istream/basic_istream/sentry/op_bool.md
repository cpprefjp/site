# operator bool
* istream[meta header]
* std[meta namespace]
* basic_istream::sentry[meta class]
* function[meta id-type]

```cpp
operator bool() const;          // (1) C++98
explicit operator bool() const; // (1) C++11
```

## 概要
入力処理の前処理が正常に完了したか否かを返す。


## 戻り値
本オブジェクトの構築時に入力処理の前処理が正常に完了していれば`true`、そうでなければ`false`。


## 備考
C++11で`explicit`が付加された。これにより、`bool`への意図しない暗黙変換が行われなくなった。


## バージョン
### 言語
- C++98


## 関連項目
- [`(constructor)`](op_constructor.md)
