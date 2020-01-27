# static_assert のメッセージ省略を許可
* cpp17[meta cpp]

## 概要
`static_assert` は [C++11](/lang/cpp11/static_assert.md) で導入されたが、第2引数に診�メッセージを指定しなければならなかった。
C++17 ではこれを省略できるようになった。


## 仕様
```cpp
static_assert(定数式, 文�列リテラル); // C++11
static_assert(定数式); // C++17 以降
```

* 「『`文�列リテラル`が与えられた場合、』診�メッセージは`文�列リテラル`を含む」と文面が改められた  
    それ以外の場合の診�メッセージは未規定
* その他の点は [C++11](/lang/cpp11/static_assert.md) と同じ
* 機能テストマク�は `__cpp_static_assert` (`201411`)

## 例
```cpp example
int main()
{
  constexpr bool flag = false;
  //static_assert(flag, "flag should be true"); // C++17 までは診�メッセージを省略できない
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
`assert` は条件式のみを引数に取るのに対し、`static_assert` には診�メッセージを提供しなければならなかった。

[Boost.StaticAssert](http://www.boost.org/doc/libs/release/doc/html/boost_staticassert.html) は以下のような `BOOST_STATIC_ASSERT` マク�を提供しており、
`static_assert` の診�メッセージを省略できた:
```cpp
#define BOOST_STATIC_ASSERT(B) static_assert(B, #B)
```

標準の `static_assert` でも診�メッセージを省略できることが望まれた。


## 検討されたほかの選択肢
`BOOST_STATIC_ASSERT` のようなマク�で`定数式`をテ�スト化することには反対意見があり、以下の案が検討された
(『』内は追加された箇所):

* 『`文�列リテラル`が与えられた場合、』診�メッセージは`文�列リテラル`を含む  
    『それ以外の場合、診�メッセージは`定数式`のテ�ストからなる』
* 『`文�列リテラル`が与えられた場合、』診�メッセージは`文�列リテラル`を含む  
    『それ以外の場合、診�メッセージは実装依�』
* 『`static_assert` は1つ以上の`定数式`を取り、診�メッセージはテ�ストに変換した`定数式`を含む』


## 関連項目
- [C++11 `static_assert`](/lang/cpp11/static_assert.md)


## 参照
- [N3846 Extending `static_assert`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3846.pdf)
- [N3928 Extending `static_assert`, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3928.pdf)
