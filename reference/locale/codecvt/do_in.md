# do_in
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual result
    do_in(stateT& state,
          const externT* from,
          const externT* from_end,
          const externT*& from_next,
          internT* to,
          internT* to_end,
          internT*& to_next) const; // (1) C++98
```

## 概要
外部型の文字列を内部型の文字列へ変換する。[`in()`](in.md)から呼び出される仮想関数である。


## 事前条件
`from <= from_end && to <= to_end`が妥当な式であり、定義された動作をすること。またその結果が`true`であること。

`state`は、シーケンスの先頭であれば初期化されていること。そうでなければ、シーケンス内の先行する文字を変換した結果と等しいこと。


## 効果
範囲`[from, from_end)`の文字を変換し、結果を`to`から順に格納する。変換する要素数は`(from_end - from)`以下、格納する要素数は`(to_end - to)`以下である。

変換できない文字に遭遇した場合は、そこで変換を停止する。`from_next`と`to_next`は、常に変換に成功した最後の要素の1つ次を指す。


## 戻り値
[`codecvt_base::result`](/reference/locale/codecvt_base.md)の列挙値。意味は[`do_out()`](do_out.md)と同じである。


## 備考
`state`に対する操作は未規定である。

[`basic_filebuf`](/reference/fstream/basic_filebuf.md)が使用する`codecvt`ファセットは、`to != to_end`で`do_in(state, from, from_end, from_next, to, to_end, to_next)`が`ok`を返すならば、`do_in(state, from, from_end, from_next, to, to + 1, to_next)`も`ok`を返す、という性質を持つ必要がある。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::in`](in.md)
- [`codecvt::do_out`](do_out.md)
- [`codecvt_base`](/reference/locale/codecvt_base.md)
