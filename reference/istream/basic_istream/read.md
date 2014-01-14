#get
```cpp
basic_istream<CharT, Traits>& read(char_type* s, streamsize n);
```

##概要

（非書式化入力関数）ストリームから指定した数の文字を入力する。

実引数として配列要素へのポインタ`s`とその要素数`n`を受け取る。
[`get`](get.md)メンバ関数などと異なり、`s`の末尾にヌル文字を書き込む処理がない。

また、`n`文字より少ない段階でEOFに達した場合を入力失敗として扱う（`failbit`を立てる）点も、他の多くのメンバ関数と異なる。

##効果
1. `sentry`オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `good()`メンバ関数を呼び出して`false`であったら、`setstate(failbit)`を呼び出して終了する。
1. 以下のいずれかを満たすまで、文字を入力して書き込む。
    - 実引数で指定された`n`文字まで入力した場合。
    - EOFに達した場合。この場合、`setstate(failbit | eofbit)`を呼び出す。

##戻り値
`*this`

##例
TBD

##出力
TBD

##実装例
TBD

##バージョン
###言語
- C++98

##参照
- [readsome](readsome.md)
