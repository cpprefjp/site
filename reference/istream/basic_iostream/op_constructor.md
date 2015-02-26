#コンストラクタ
* istream[meta header]

```cpp
explicit basic_iostream(basic_streambuf<CharT, Traits>* sb);
basic_iostream(basic_iostream&& rhs);
```

##概要
オブジェクトを構築する。

## 効果
- ストリームバッファ`sb`を実引数として受け取るコンストラクタ
    - 基底クラスのコンストラクタ呼び出しとして、`basic_istream(sb)`と`basic_ostream(sb)`を実行する。
- ムーブコンストラクタ
    - `basic_istream::move(std::move(rhs))`を呼び出す。

##実装例

##バージョン
###言語
- C++98
- C++11: ムーブコンストラクタの追加

##参照
