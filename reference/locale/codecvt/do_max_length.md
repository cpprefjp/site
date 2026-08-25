# do_max_length
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int do_max_length() const throw();  // (1) C++98
  virtual int do_max_length() const noexcept; // (1) C++11
```

## 概要
内部型の1文字への変換に必要な外部型の最大の長さを取得する。[`max_length()`](max_length.md)から呼び出される仮想関数である。


## 戻り値
任意の妥当な範囲`[from, from_end)`と`stateT`の値`state`について、[`do_length`](do_length.md)`(state, from, from_end, 1)`が返しうる最大の値。

特殊化`codecvt<char, char, mbstate_t>::do_max_length()`は`1`を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::max_length`](max_length.md)
