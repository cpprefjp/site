# basic_ios
* ios[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT> >
  class basic_ios : public ios_base { …… };

  using ios  = basic_ios<char>;                                  // <iosfwd> で定義
  using wios = basic_ios<wchar_t>;                              // <iosfwd> で定義
}
```
* ios_base[link ios_base.md]
* char_traits[link ../string/char_traits.md]

## 概要
`basic_ios` は入出力に対する共通機能を提供するクラステンプレートである。  
[`ios_base`](ios_base.md) が�ケールや文�型に依�しない書式の状態を保持するのに対して、本クラスは�ケールや文�型に依�した書式の状態や、[ストリームバッファ](../streambuf/basic_streambuf.md)とその状態を保持する。

テンプレートパラメータとして文�型と文�特性型を受け取るようになっており、使用を容易にするため、以下のパラメータ�定済みエイリアスが定義されている。
このエイリアスは `<iosfwd>` ヘッダで定義されている。

| エイリアス  | 説明                     | 対応バージョン |
|-------------|--------------------------|----------------|
| `ios`       | `char` 型のストリーム    |                |
| `wios`      | `wchar_t` 型のストリーム |                |

## メンバ関数
### 構築・破棄・代入
| 名前                                           | 説明                     | 対応バージョン |
|------------------------------------------------|--------------------------|----------------|
| [`(constructor)`](basic_ios/op_constructor.md) | コンストラクタ           |                |
| [`(destructor)`](basic_ios/op_destructor.md)   | デストラクタ             |                |
| [`operator=`](basic_ios/op_assign.md)          | 代入演算�               |                |

なお、コピーコンストラクタとコピー代入演算�はdelete定義されている。
C++03では、delete定義の代わりに`private`で宣言のみされていた。

### 状態ビット

| 名前                                        | 説明                                       | 対応バージョン |
|---------------------------------------------|--------------------------------------------|----------------|
| [`rdstate`](basic_ios/rdstate.md)           | 状態ビットを�み取る                       |                |
| [`clear`](basic_ios/clear.md)               | 状態ビットの初期化                         |                |
| [`setstate`](basic_ios/setstate.md)         | 状態ビットの�定                           |                |
| [`good`](basic_ios/good.md)                 | �常状態であるか否かの判定                 |                |
| [`eof`](basic_ios/eof.md)                   | eof状態であるか否かの判定                  |                |
| [`fail`](basic_ios/fail.md)                 | fail状態であるか否かの判定                 |                |
| [`bad`](basic_ios/bad.md)                   | bad状態であるか否かの判定                  |                |
| [`operator bool`](basic_ios/op_bool.md)     | �常状態であるか否かの判定                 | C++11          |
| [`operator void*`](basic_ios/op_voidptr.md) | �常状態であるか否かの判定                 | C++03 まで     |
| [`operator!`](basic_ios/op_not.md)          | 異常状態であるか否かの判定                 |                |
| [`exceptions`](basic_ios/exceptions.md)     | 特定の状態時に例外を投げる指定の�定・取得 |                |

### ストリームバッファ

| 名前                          | 説明                                           | 対応バージョン |
|-------------------------------|------------------------------------------------|----------------|
| [`rdbuf`](basic_ios/rdbuf.md) | ストリームバッファオブジェクトの�定・取得     |                |
| [`tie`](basic_ios/tie.md)     | 同期する出力ストリームオブジェクトの�定・取得 |                |

### 書式化その他

| 名前                              | 説明                                     | 対応バージョン |
|-----------------------------------|------------------------------------------|----------------|
| [`copyfmt`](basic_ios/copyfmt.md) | 書式�定のコピー                         |                |
| [`fill`](basic_ios/fill.md)       | フィールドの余白を埋める文�の取得・�定 |                |
| [`imbue`](basic_ios/imbue.md)     | �ケールの�定                           |                |

### ワイド文�変換

| 名前                            | 説明                                       | 対応バージョン |
|---------------------------------|--------------------------------------------|----------------|
| [`narrow`](basic_ios/narrow.md) | `char_type` 型文�の `char` 型文�への変換 |                |
| [`widen`](basic_ios/widen.md)   | `char` 型文�の `char_type` 型文�への変換 |                |

### protectedメンバ関数

| 名前                                           | 説明                           | 対応バージョン |
|------------------------------------------------|--------------------------------|----------------|
| [`(constructor)`](basic_ios/op_constructor.md) | コンストラクタ                 |                |
| [`init`](basic_ios/init.md)                    | ストリームオブジェクトの初期化 |                |
| [`move`](basic_ios/move.md)                    | ムーブ                         | C++11          |
| [`swap`](basic_ios/swap.md)                    | 値の交換                       | C++11          |
| [`set_rdbuf`](basic_ios/set_rdbuf.md)          | ストリームバッファの�定       | C++11          |

## メンバ型

| 名前          | 説明                       | 対応バージョン |
|---------------|----------------------------|----------------|
| `char_type`   | テンプレート仮引数`CharT`  |                |
| `int_type`    | `Traits::int_type`         |                |
| `pos_type`    | `Traits::pos_type`         |                |
| `off_type`    | `Traits::off_type`         |                |
| `traits_type` | テンプレート仮引数`Traits` |                |


## 備考
本クラス、および、本クラスを継承したクラスの説明については、上記にあるメンバ型 `pos_type`、および、`off_type` がそれぞれ [`streampos`](../iosfwd/type-streampos.md.nolink)、および、[`streamoff`](type-streamoff.md) である場合の記載となっている。  
これらのメンバ型がそれ以外の型の場合の挙動は実装依�である。

## 参照
- [`ios_base`](ios_base.md)
