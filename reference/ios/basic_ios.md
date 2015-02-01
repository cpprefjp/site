#basic_ios
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ios : public ios_base { …… };
}
```
* ios_base[link ./ios_base.md]
* char_traits[link ../string/char_traits.md]

##概要
`basic_ios`は入出力に対する共通機能を提供するクラスである。
ストリームバッファや状態ビットの管理などの機能を有する。

##メンバ関数
###構築・破棄
| 名前            | 説明                     | 対応バージョン |
|-----------------|--------------------------|----------------|
| `(constructor)` | コンストラクタ           |                |
| `(destructor)`  | デストラクタ             |                |
| `init`          | 初期化                   |                |
| `move`          | ムーブ                   | C++11          |
| `swap`          | 値の交換                 | C++11          |
| `set_rdbuf`     | ストリームバッファの設定 | C++11          |

なお、コピーコンストラクタとコピー代入演算子はdelete定義されている。
C++03では、delete定義の代わりに`private`で宣言のみされていた。

###状態ビット

| 名前                     | 説明                                       | 対応バージョン |
|--------------------------|--------------------------------------------|----------------|
| [`rdstate`](basic_ios/rdstate.md)                | 状態ビットを読み取る                       |                |
| [`clear`](basic_ios/clear.md)                    | 状態ビットの初期化                         |                |
| [`setstate`](basic_ios/setstate.md)              | 状態ビットの設定                           |                |
| [`good`](basic_ios/good.md)                      | 正常状態であるか否かの判定                 |                |
| [`eof`](basic_ios/eof.md)                        | eof状態であるか否かの判定                  |                |
| [`fail`](basic_ios/fail.md)                      | fail状態であるか否かの判定                 |                |
| [`bad`](basic_ios/bad.md)                        | bad状態であるか否かの判定                  |                |
| [`explicit operator bool`](basic_ios/op_bool.md) | 正常状態であるか否かの判定                 | C++11          |
| [`operator!`](basic_ios/op_not.md)               | 異常状態であるか否かの判定                 |                |
| `exceptions`             | 特定の状態時に例外を投げる指定の設定・取得 |                |

C++03までは、`explicit operator bool`関数の代わりに、同じ機能を持つ`operator void*`関数が存在した。

###ストリームバッファ

| 名前    | 説明                                               | 対応バージョン |
|---------|----------------------------------------------------|----------------|
| `rdbuf` | ストリームバッファオブジェクトの設定・取得         |                |
| `tie`   | 関連するストリームバッファオブジェクトの設定・取得 |                |

###書式化その他

| 名前      | 説明                                     | 対応バージョン |
|-----------|------------------------------------------|----------------|
| `copyfmt` | 書式設定の転送                           |                |
| `fill`    | フィールドの余白を埋める文字の取得・設定 |                |
| `imbue`   | ロケールの設定                           |                |

###ワイド文字変換

| 名前     | 説明                             | 対応バージョン |
|----------|----------------------------------|----------------|
| `narrow` | 対応するマルチバイト文字への変換 |                |
| `widen`  | 対応するワイド文字への変換       |                |

便宜的にマルチバイト文字と記した。
マルチバイト文字列でないことに注意。
一般的に、かな・漢字などは変換できない。

##メンバ型

| 名前          | 説明                       | 対応バージョン |
|---------------|----------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`  |                |
| `int_type`    | `Traits::int_type`         |                |
| `pos_type`    | `Traits::pos_type`         |                |
| `off_type`    | `Traits::off_type`         |                |
| `traits_type` | テンプレート仮引数`Traits` |                |

##参照
- [`ios_base`](./ios_base.md)
