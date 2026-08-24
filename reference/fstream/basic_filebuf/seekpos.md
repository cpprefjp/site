# seekpos
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
protected:
  virtual pos_type
    seekpos(pos_type sp,
            ios_base::openmode which = ios_base::in | ios_base::out);  // (1) C++03
  pos_type
    seekpos(pos_type sp,
            ios_base::openmode which = ios_base::in | ios_base::out) override; // (1) C++17
```
* ios_base::openmode[link /reference/ios/ios_base/type-openmode.md]

## 概要
絶対位置指定でファイル位置を移動する。

このメンバ関数は`protected`であり、[`std::basic_streambuf`](/reference/streambuf/basic_streambuf.md)の`public`メンバ関数[`pubseekpos()`](/reference/streambuf/basic_streambuf/pubseekpos.md)を通して間接的に呼び出される。


## 事前条件
`sp`が、同一ファイルに対する位置指定関数（[`seekoff`](seekoff.md)または`seekpos`）の以前の成功した呼び出しによって取得された値であること。そうでない場合、動作は未定義である。


## 効果
可能であれば、`sp`に格納された位置に対応するようファイル位置を変更する。ファイル位置の変更は以下のように行われる。ここで`om`は最後の[`open()`](open.md)呼び出しに渡されたオープンモードである。

1. `(om & `[`ios_base::out`](/reference/ios/ios_base/type-openmode.md)`) != 0`の場合、出力シーケンスを更新し、シフト状態を戻すシーケンス（unshift sequence）を書き込む。
2. あたかも[`std::fsetpos`](/reference/cstdio/fsetpos.md)を呼び出したかのようにファイル位置を`sp`に設定する。
3. `(om & `[`ios_base::in`](/reference/ios/ios_base/type-openmode.md)`) != 0`の場合、入力シーケンスを更新する。

[`is_open()`](is_open.md)が`false`を返す場合、この操作は失敗する。また、`sp`が無効なストリーム位置である場合、またはこの関数がどちらのシーケンスも位置指定しない場合も、位置指定操作は失敗する。


## 戻り値
成功した場合は`sp`を返す。そうでない場合は`pos_type(off_type(-1))`を返す。


## 備考
引数`which`は使用されない。入力・出力シーケンスのどちらを更新するかは、最後の[`open()`](open.md)呼び出しに渡されたオープンモードのみによって決まる。


## バージョン
### 言語
- C++98


## 関連項目
- [`basic_streambuf::seekpos`](/reference/streambuf/basic_streambuf/seekpos.md)
- [`basic_streambuf::pubseekpos`](/reference/streambuf/basic_streambuf/pubseekpos.md)


## 参照
- [LWG Issue 2473. `basic_filebuf`'s relation to C `FILE` semantics](https://cplusplus.github.io/LWG/issue2473)
    - `seekpos`が`fsetpos`を呼び出したかのようにファイル位置を設定する、と明確化された（CのFILEの更新モードにおける読み書き間の位置指定制約に整合させるため）
    - この修正は欠陥報告(DR)であり、C++98に遡及して適用される。`seekoff`には`fseek`の言及があるのに`seekpos`にはCの対応関数の言及が欠けていた規定漏れの補完であり、処理系は当初からCの`FILE`のセマンティクスに従って実装されていたため
