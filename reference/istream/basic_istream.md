#basic_istream
```cpp
namespace std {
  template<class CharT, class Traits = char_traits<CharT>>
  class basic_istream : virtual public basic_ios<CharT, Traits> { …… };

  typedef basic_istream<char> istream;
  typedef basic_istream<wchar_t> wistream;
}
```
* basic_ios[link ../ios/basic_ios.md]
* char_traits[link ../string/char_traits.md]

##概要
`basic_istream`は、入力ストリームを表現するクラスである。
すなわち、`rdbuf()`が指し示すストリームバッファオブジェクトに対する読み取り操作を提供する。

各種の入力関数、特に`>>`演算子、がこのクラスのメンバ関数・非メンバ関数として定義されている。
このため、ユーザーコードで入力処理を実装する際には、`basic_istream`、あるいはそれに対するtypedefである`istream`や`wistream`などの型への参照を実引数として受け取るようにすると良い。

##書式化入力関数と非書式化入力関数

`basic_istream`での入力操作は、書式化入力関数と非書式化入力関数の2種類に分類される。

###書式化入力

書式化入力関数は、一般的に言ってストリームバッファから抽出した文字の並びから目的のオブジェクトに変換する処理を伴う入力処理である。
以下の共通した特徴を持つ。

- `skipws`フラグが設定されている場合、入力処理開始時に空白文字を読み飛ばす処理が挿入される。
- オブジェクトへの変換処理が失敗した場合、`setstate(ios_base::failbit)`が呼び出される。

通常、`>>`演算子での入力処理は書式化入力関数である。

###非書式化入力関数

非書式化入力関数は、ストリームバッファから抽出した文字の並びをそのまま呼び出し元に引き渡す入力処理である。
また、ストリームバッファからの読み取りを伴わない入力操作も便宜上こちらに分類される。

##メンバ

基底クラスである[`ios_base`](../ios/ios_base.md)と[`basic_ios`](../ios/basic_ios.md)も参照のこと。

###型

| 名前                                | 説明                     | 対応バージョン |
|-------------------------------------|--------------------------|----------------|
| [`sentry`](basic_istream/sentry.md) | 入力操作の前処理・後処理 |                |

###構築・破棄

| 名前                                              | 説明           | 対応バージョン |
|---------------------------------------------------|----------------|----------------|
| [`(constructor)`](basic_istream/basic_istream.md) | コンストラクタ |                |
| `(destructor)`                                    | デストラクタ   |                |
| `swap`                                            | 値の交換       |                |

- コピーコンストラクタとコピー代入演算子はdelete定義されている。
- ムーブコンストラクタ・ムーブ代入演算子とswapはprotectedで定義されている。

###入力処理

| 名前                                        | 説明                             | 対応バージョン |
|---------------------------------------------|----------------------------------|----------------|
| [`operator>>`](basic_istream/op_istream.md) | 書式化入力・マニピュレータの実行 |                |
| [`get`](basic_istream/get.md)               | 文字・文字列の入力               |                |
| [`getline`](basic_istream/getline.md)       | 1行の文字列の入力                |                |
| [`peek`](basic_istream/peek.md)             | 次の入力文字を確認する           |                |
| [`read`](basic_istream/read.md)             | 指定した数ちょうどの文字の入力   |                |
| [`readsome`](basic_istream/readsome.md)     | 指定した数までの文字の入力       |                |
| [`ignore`](basic_istream/ignore.md)         | 入力文字を読み捨てる             |                |

`>>`演算子のほとんどは書式化入力関数である。
その他のメンバ関数は非書式化入力関数である。

### 読み戻し
| 名前                                  | 説明                        | 対応バージョン |
|---------------------------------------|-----------------------------|----------------|
| [`putback`](basic_istream/putback.md) | 任意の文字を1文字を戻す     |                |
| [`unget`](basic_istream/unget.md)     | 最後に読み取った1文字を戻す |                |

これらは非書式化入力関数である。

### シーク
| 名前                              | 説明                         | 対応バージョン |
|-----------------------------------|------------------------------|----------------|
| [`tellg`](basic_istream/tellg.md) | 現在の読み取り位置を取得する |                |
| [`seekg`](basic_istream/seekg.md) | 読み取り位置を移動する       |                |

これらは非書式化入力関数である。

### 入力処理その他

| 名前                                | 説明                                                   | 対応バージョン |
|-------------------------------------|--------------------------------------------------------|----------------|
| [`gcount`](basic_istream/gcount.md) | 最後に実行した非書式化入力関数での入力文字数を取得する |                |
| [`sync`](basic_istream/sync.md)     | ストリームバッファの同期                               |                |

gcountは書式化入力関数・非書式化入力関数いずれでもない。
syncは非書式化入力関数である。

##参照

- 基底クラス
 - [`ios_base`](../ios/ios_base.md)
 - [`basic_ios`](../ios/basic_ios.md)
- オブジェクト
 - [`cin`](../iostream/cin.md)
 - [`wcin`](../iostream/wcin.md)
