# do_out
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual result
    do_out(stateT& state,
          const internT* from,
          const internT* from_end,
          const internT*& from_next,
          externT* to,
          externT* to_end,
          externT*& to_next) const; // (1) C++98
```

## 概要
内部型の文字列を外部型の文字列へ変換する。[`out()`](out.md)から呼び出される仮想関数である。


## 事前条件
`from <= from_end && to <= to_end`が妥当な式であり、定義された動作をすること。またその結果が`true`であること。

`state`は、シーケンスの先頭であれば初期化されていること。そうでなければ、シーケンス内の先行する文字を変換した結果と等しいこと。


## 効果
範囲`[from, from_end)`の文字を変換し、結果を`to`から順に格納する。変換する要素数は`(from_end - from)`以下、格納する要素数は`(to_end - to)`以下である。

変換できない文字に遭遇した場合は、そこで変換を停止する。`from_next`と`to_next`は、常に変換に成功した最後の要素の1つ次を指す。

`noconv`を返す場合、`internT`と`externT`は同じ型であり、変換後のシーケンスは入力シーケンス`[from, from_next)`と同一である。このとき`to_next`は`to`と等しく設定され、`state`の値は変更されず、`[to, to_end)`の値も変更されない。


## 戻り値
[`codecvt_base::result`](/reference/locale/codecvt_base.md)の列挙値。

| 値 | 意味 |
|----|------|
| `ok` | 変換が完了した |
| `partial` | すべての入力文字を変換できなかった |
| `error` | `[from, from_end)`に変換できない文字があった |
| `noconv` | `internT`と`externT`が同じ型で、入力シーケンスが変換後のシーケンスと同一である |

`from_next == from_end`である場合の`partial`は、出力側がすべての出力要素を吸収していないか、次の出力要素を生成するために追加の入力要素が必要であることを示す。


## 備考
`state`に対する操作は未規定である。この引数は、たとえばシフト状態の保持、変換オプションの指定、シーク位置のキャッシュの識別などに使用できる。

[`basic_filebuf`](/reference/fstream/basic_filebuf.md)が使用する`codecvt`ファセットは、`from != from_end`で`do_out(state, from, from_end, from_next, to, to_end, to_next)`が`ok`を返すならば、`do_out(state, from, from + 1, from_next, to, to_end, to_next)`も`ok`を返す、という性質を持つ必要がある（内部文字を1文字ずつ変換できる必要がある）。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::out`](out.md)
- [`codecvt::do_in`](do_in.md)
- [`codecvt_base`](/reference/locale/codecvt_base.md)
