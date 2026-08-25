# do_always_noconv
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual bool do_always_noconv() const throw();  // (1) C++98
  virtual bool do_always_noconv() const noexcept; // (1) C++11
```

## 概要
変換を行う必要がないか判定する。[`always_noconv()`](always_noconv.md)から呼び出される仮想関数である。


## 戻り値
すべての妥当な実引数について[`do_in()`](do_in.md)と[`do_out()`](do_out.md)が`noconv`を返す場合は`true`、そうでない場合は`false`。

特殊化`codecvt<char, char, mbstate_t>`は`true`を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::always_noconv`](always_noconv.md)
