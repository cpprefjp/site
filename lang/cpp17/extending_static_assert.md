# static_assert のメッセージ省略を許可
* cpp17[meta cpp]

## 概要
`static_assert` は [C++11](/lang/cpp11/static_assert.md) で導入されたが、第2引数に診断メッセージを指定しなければならなかった。
C++17 ではこれを省略できるようになった。


## 仕様
```cpp
static_assert(定数式, 文字列リテラル); // C++11
static_assert(定数式); // C++17 以降
```

* 「『`文字列リテラル`が与えられた場合、』診断メッセージは`文字列リテラル`を含む」と文面が改められた  
    それ以外の場合の診断メッセージは未規定
* その他の点は [C++11](/lang/cpp11/static_assert.md) と同じ
* 機能テストマクロは `__cpp_static_assert` (`201411`)

## 例
```cpp example
int main()
{
  constexpr bool flag = false;
  //static_assert(flag, "flag should be true"); // C++17 までは診断メッセージを省略できない
  static_assert(flag); // C++17 以降
}
```
* static_assert[color ff0000]

### 出力
不適格。

### 備考
clang++ 5.0.0 にてコンパイルした場合、
```
example_static_assert.cpp:5:3: error: static_assert failed
  static_assert(flag); // C++17 以降
  ^             ~~~~
1 error generated.
```


## この機能が必要になった背景・経緯
`assert` は条件式のみを引数に取るのに対し、`static_assert` には診断メッセージを提供しなければならなかった。

[Boost.StaticAssert](http://www.boost.org/doc/libs/release/doc/html/boost_staticassert.html) は以下のような `BOOST_STATIC_ASSERT` マクロを提供しており、
`static_assert` の診断メッセージを省略できた:
```cpp
#define BOOST_STATIC_ASSERT(B) static_assert(B, #B)
```

標準の `static_assert` でも診断メッセージを省略できることが望まれた。


## 検討されたほかの選択肢
`BOOST_STATIC_ASSERT` のようなマクロで`定数式`をテキスト化することには反対意見があり、以下の案が検討された
(『』内は追加された箇所):

* 『`文字列リテラル`が与えられた場合、』診断メッセージは`文字列リテラル`を含む  
    『それ以外の場合、診断メッセージは`定数式`のテキストからなる』
* 『`文字列リテラル`が与えられた場合、』診断メッセージは`文字列リテラル`を含む  
    『それ以外の場合、診断メッセージは実装依存』
* 『`static_assert` は1つ以上の`定数式`を取り、診断メッセージはテキストに変換した`定数式`を含む』


## 関連項目
- [C++11 `static_assert`](/lang/cpp11/static_assert.md)


## 参照
- [N3846 Extending `static_assert`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3846.pdf)
- [N3928 Extending `static_assert`, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3928.pdf)
