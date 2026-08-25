# do_unshift
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  virtual result
    do_unshift(stateT& state,
               externT* to,
               externT* to_end,
               externT*& to_next) const; // (1) C++98
```

## 概要
文字列を終端するために必要な、シフト状態を戻す文字列を出力する。[`unshift()`](unshift.md)から呼び出される仮想関数である。


## 事前条件
`to <= to_end`が妥当な式であり、定義された動作をすること。またその結果が`true`であること。

`state`は、シーケンスの先頭であれば初期化されていること。そうでなければ、シーケンス内の先行する文字を変換した結果と等しいこと。


## 効果
現在の状態が`state`である場合に、シーケンスを終端するために付加すべき文字を`to`から順に格納する。格納する要素数は`(to_end - to)`以下であり、`to_next`は格納に成功した最後の要素の1つ次を指す。

通常これは、状態を`stateT()`に戻すための文字列となる。


## 戻り値
[`codecvt_base::result`](/reference/locale/codecvt_base.md)の列挙値。

| 値 | 意味 |
|----|------|
| `ok` | シーケンスを完了した |
| `partial` | `state`の値に対してシーケンスを終端するために、`to_end - to`より多くの出力要素が必要だった |
| `error` | 未規定のエラーが発生した |
| `noconv` | この`state_type`では終端処理が不要である |

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt::unshift`](unshift.md)
- [`codecvt_base`](/reference/locale/codecvt_base.md)
