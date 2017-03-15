# basic_ostream
* ostream[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_ostream : virtual public basic_ios<CharT, Traits> { …… };

  using ostream  = basic_ostream<char>;
  using wostream = basic_ostream<wchar_t>;
}
```
* basic_ios[link ../ios/basic_ios.md]
* char_traits[link ../string/char_traits.md]

## 概要
`basic_ostream` は、出力ストリームを表現するクラスである。
すなわち、[`rdbuf()`](../ios/basic_ios/rdbuf.md) が指し示すストリームバッファオブジェクトに対する書き込み操作を提供する。

各種の出力関数——特に`<<`演算子——がクラスのメンバ関数・非メンバ関数として定義されている。
このため、ユーザーコードで入力処理を実装する際には、`basic_ostream`、あるいはそれに対する別名である`ostream`や`wostream`などの型への参照を実引数として受け取るようにすると良い。

テンプレートパラメータとして文字型を受け取るようになっており、使用を容易にするため、以下のパラメータ設定済みエイリアスが定義されている。
このエイリアスは`<ostream>`ヘッダと`<iosfwd>`ヘッダで定義されている。

| エイリアス | 説明 | 対応バージョン |
|------------|------|----------------|
| `ostream`  | `char`型。ASCII、UTF-8等のマルチバイト文字列や、バイナリデータとして使用する。 | |
| `wostream` | `wchar_t`型。ワイド文字列として使用する。                                      | |

## 書式化出力関数と非書式化出力関数

`basic_ostream`での出力操作は、書式化出力関数と非書式化出力関数の2種類に分類される。

### 書式化出力関数と非書式化出力関数の効果

注意：書式化出力関数と非書式化出力関数すべてについて、「効果」の項目は以下の処理を前提として記載している。

書式化出力関数・非書式化出力関数は、出力処理に先立って`sentry`オブジェクトを構築し、関数から脱出する前に破棄する。
構築した [`sentry`](basic_ostream/sentry.md) オブジェクトが [`operator bool`](basic_ostream/sentry/op_bool.md) 関数で `true` に変換できる場合のみ、実際の出力処理（各関数の「効果」として記載した処理）が実行される。

（書式化出力関数のみ）[`operator bool`](basic_ostream/sentry/op_bool.md) 関数の結果が `false` であったら、[`setstate`](../ios/basic_ios/setstate.md)`(ios_base::badbit)` を呼び出す。

関数内部で例外が送出された場合、`ios_base::badbit` をセットする。
そして、`(`[`exceptions`](../ios/basic_ios/exceptions.md)`() &` [`badbit`](../ios/ios_base/type-iostate.md)`) != 0` であれば例外を再送出する。

## メンバ

基底クラスである [`ios_base`](../ios/ios_base.md) と[`basic_ios`](../ios/basic_ios.md) も参照のこと。

### 型

| 名前                                | 説明                     | 対応バージョン |
|-------------------------------------|--------------------------|----------------|
| [`sentry`](basic_ostream/sentry.md) | 出力操作の前処理・後処理 |                |

### 構築・破棄

| 名前                                               | 説明           | 対応バージョン |
|----------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_ostream/op_constructor.md) | コンストラクタ |                |
| [`(destructor)`](basic_ostream/op_destructor.md)   | デストラクタ   |                |

- コピーコンストラクタとコピー代入演算子はdelete定義されている。
- ムーブコンストラクタ・ムーブ代入演算子と`swap`はprotectedで定義されている。

### 出力処理

| 名前                                        | 説明                             | 対応バージョン |
|---------------------------------------------|----------------------------------|----------------|
| [`operator<<`](basic_ostream/op_ostream.md) | 書式化出力・マニピュレータの実行 |                |
| [`put`](basic_ostream/put.md)               | 文字の出力                       |                |
| [`write`](basic_ostream/write.md)           | 文字列・バイト列の出力           |                |
| [`flush`](basic_ostream/flush.md)           | ストリームバッファのフラッシュ   |                |

`<<`演算子のほとんどは書式化出力関数である。
その他のメンバ関数は非書式化出力関数である。

### シーク
| 名前                              | 説明                         | 対応バージョン |
|-----------------------------------|------------------------------|----------------|
| [`tellp`](basic_ostream/tellp.md) | 現在の読み取り位置を取得する |                |
| [`seekp`](basic_ostream/seekp.md) | 読み取り位置を移動する       |                |

### protectedメンバ関数

| 名前                                               | 説明           | 対応バージョン |
|----------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_ostream/op_constructor.md) | コンストラクタ |                |
| [`operator=`](basic_ostream/op_assign.md)          | 代入           | C++11          |
| [`swap`](basic_ostream/swap.md)                    | 値の交換       | C++11          |

## 非メンバ関数

| 名前                                             | 説明                                                       | 対応バージョン |
|--------------------------------------------------|------------------------------------------------------------|----------------|
| [`operator<<`](basic_ostream/op_ostream_free.md) | 文字・文字列の書式化出力、および、右辺値ストリームへの出力 |                |

## 参照

- 基底クラス
    - [`ios_base`](../ios/ios_base.md)
    - [`basic_ios`](../ios/basic_ios.md)
- `basic_ostream<>`型のオブジェクト
    - [`cout`](../iostream/cout.md)
    - [`wcout`](../iostream/wcout.md.nolink)
    - [`clog`](../iostream/clog.md)
    - [`wclog`](../iostream/wclog.md.nolink)
    - [`cerr`](../iostream/cerr.md)
    - [`wcerr`](../iostream/wcerr.md.nolink)
