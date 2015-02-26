#コンストラクタ
* istream[meta header]
* std[meta namespace]
* basic_istream[meta class]
* function[meta id-type]

```cpp
explicit basic_istream(basic_streambuf<CharT, Traits>* sb);
basic_istream(basic_istream&& rhs);
```

##概要
オブジェクトを構築する。

1つ目のコンストラクタは、`basic_ios::init(sb)`を呼び出す。

##実装例

##バージョン
###言語
- C++98

##参照
