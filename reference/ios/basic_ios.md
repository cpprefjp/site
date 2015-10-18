#basic_ios
* ios[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT> >
  class basic_ios : public ios_base { …… };

  typedef basic_ios<char> ios;                                  // <iosfwd> で定義
  typedef basic_ios<wchar_t> wios;                              // <iosfwd> で定義
}
```
* ios_base[link ./ios_base.md]
* char_traits[link ../string/char_traits.md]

##概要
`basic_ios` は入出力に対する共通機能を提供するクラステンプレートである。  
[`ios_base`](ios_base.md) がロケールや文字型に依存しない書式の状態を保持するのに対して、本クラスはロケールや文字型に依存した書式の状態や、 [ストリームバッファ](../streambuf/basic_streambuf.md)とその状態を保持する。

テンプレートパラメータとして文字型と文字特性型を受け取るようになっており、使用を容易にするため、以下のパラメータ設定済みエイリアスが定義されている。
このエイリアスは `<iosfwd>` ヘッダで定義されている。

| エイリアス  | 説明                     | 対応バージョン |
|-------------|--------------------------|----------------|
| `ios`       | `char` 型のストリーム    |                |
| `wios`      | `wchar_t` 型のストリーム |                |

##メンバ関数
###構築・破棄
| 名前            | 説明                     | 対応バージョン |
|-----------------|--------------------------|----------------|
| `(constructor)` | コンストラクタ           |                |
| [`(destructor)`](basic_ios/op_destructor.md)  | デストラクタ             |                |

なお、コピーコンストラクタとコピー代入演算子はdelete定義されている。
C++03では、delete定義の代わりに`private`で宣言のみされていた。

###状態ビット

| 名前                                        | 説明                                       | 対応バージョン |
|---------------------------------------------|--------------------------------------------|----------------|
| [`rdstate`](basic_ios/rdstate.md)           | 状態ビットを読み取る                       |                |
| [`clear`](basic_ios/clear.md)               | 状態ビットの初期化                         |                |
| [`setstate`](basic_ios/setstate.md)         | 状態ビットの設定                           |                |
| [`good`](basic_ios/good.md)                 | 正常状態であるか否かの判定                 |                |
| [`eof`](basic_ios/eof.md)                   | eof状態であるか否かの判定                  |                |
| [`fail`](basic_ios/fail.md)                 | fail状態であるか否かの判定                 |                |
| [`bad`](basic_ios/bad.md)                   | bad状態であるか否かの判定                  |                |
| [`operator bool`](basic_ios/op_bool.md)     | 正常状態であるか否かの判定                 | C++11          |
| [`operator void*`](basic_ios/op_voidptr.md) | 正常状態であるか否かの判定                 | C++03 まで     |
| [`operator!`](basic_ios/op_not.md)          | 異常状態であるか否かの判定                 |                |
| [`exceptions`](basic_ios/exceptions.md)     | 特定の状態時に例外を投げる指定の設定・取得 |                |

###ストリームバッファ

| 名前                          | 説明                                           | 対応バージョン |
|-------------------------------|------------------------------------------------|----------------|
| [`rdbuf`](basic_ios/rdbuf.md) | ストリームバッファオブジェクトの設定・取得     |                |
| [`tie`](basic_ios/tie.md)     | 同期する出力ストリームオブジェクトの設定・取得 |                |

###書式化その他

| 名前                              | 説明                                     | 対応バージョン |
|-----------------------------------|------------------------------------------|----------------|
| [`copyfmt`](basic_ios/copyfmt.md) | 書式設定のコピー                         |                |
| [`fill`](basic_ios/fill.md)       | フィールドの余白を埋める文字の取得・設定 |                |
| [`imbue`](basic_ios/imbue.md)     | ロケールの設定                           |                |

###ワイド文字変換

| 名前                            | 説明                                       | 対応バージョン |
|---------------------------------|--------------------------------------------|----------------|
| [`narrow`](basic_ios/narrow.md) | `char_type` 型文字の `char` 型文字への変換 |                |
| [`widen`](basic_ios/widen.md)   | `char` 型文字の `char_type` 型文字への変換 |                |

###protectedメンバ関数

| 名前            | 説明                     | 対応バージョン |
|-----------------|--------------------------|----------------|
| `(constructor)` | コンストラクタ           |                |
| [`init`](basic_ios/init.md)          | ストリームオブジェクトの初期化 |                |
| [`move`](basic_ios/move.md)          | ムーブ                   | C++11          |
| [`swap`](basic_ios/swap.md)          | 値の交換                 | C++11          |
| [`set_rdbuf`](basic_ios/set_rdbuf.md)     | ストリームバッファの設定 | C++11          |

##メンバ型

| 名前          | 説明                       | 対応バージョン |
|---------------|----------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`  |                |
| `int_type`    | `Traits::int_type`         |                |
| `pos_type`    | `Traits::pos_type`         |                |
| `off_type`    | `Traits::off_type`         |                |
| `traits_type` | テンプレート仮引数`Traits` |                |


##備考
本クラス、および、本クラスを継承したクラスの説明については、上記にあるメンバ型 `pos_type`、および、`off_type` がそれぞれ [`streampos`](../iosfwd/type-streampos.md.nolink)、および、[`streamoff`](type-streamoff.md) である場合の記載となっている。  
これらのメンバ型がそれ以外の型の場合の挙動は実装依存である。

##参照
- [`ios_base`](./ios_base.md)
