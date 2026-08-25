# do_length
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual int
    do_length(stateT& state,
              const externT* from,
              const externT* from_end,
              size_t max) const; // (1) C++98
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
内部型文字列への変換で消費される外部型文字列の長さを取得する。[`length()`](length.md)から呼び出される仮想関数である。


## 事前条件
`from <= from_end`が妥当な式であり、定義された動作をすること。またその結果が`true`であること。

`state`は、シーケンスの先頭であれば初期化されていること。そうでなければ、シーケンス内の先行する文字を変換した結果と等しいこと。


## 効果
`state`に対する効果は、`max`要素以上のバッファを指す`to`に対して[`do_in`](do_in.md)`(state, from, from_end, from, to, to + max, to)`を呼び出した場合と同じである。


## 戻り値
`(from_next - from)`。ここで`from_next`は、範囲`[from, from_end]`のうち、範囲`[from, from_next)`の値の列が`internT`型の`max`個以下の妥当な完全文字を表すような最大の値である。

特殊化`codecvt<char, char, mbstate_t>`は、`max`と`(from_end - from)`のうち小さい方を返す。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::length`](length.md)
