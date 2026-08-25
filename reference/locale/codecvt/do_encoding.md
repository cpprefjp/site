# do_encoding
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int do_encoding() const throw();  // (1) C++98
  virtual int do_encoding() const noexcept; // (1) C++11
```

## 概要
内部型の1文字への変換に必要な外部型の長さを取得する。[`encoding()`](encoding.md)から呼び出される仮想関数である。


## 戻り値
- `externT`のエンコーディングが状態依存である場合、`-1`
- そうでない場合、内部型の1文字を生成するために必要な`externT`の文字数（一定である場合）
- その文字数が一定でない場合、`0`


## 備考
`encoding()`が`-1`を返す場合、内部型の1文字を生成するために[`max_length()`](max_length.md)より多くの`externT`要素が消費されることがある。また、最後の内部型文字を生成した要素の後ろに、追加の`externT`要素が現れることがある。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::encoding`](encoding.md)
