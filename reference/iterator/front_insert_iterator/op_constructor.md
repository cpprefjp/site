#コンストラクタ
* iterator[meta header]
* std[meta namespace]

```cpp
explicit front_insert_iterator(Container& x);
```

##概要
`front_insert_iterator`オブジェクトを構築する。

##効果
`x`へのポインタをメンバ変数`container`に保持する。

- C++11まで : `x`へのポインタは、`&x`で取得する
- C++14以降 : `x`へのポインタは、[`std::addressof`](/reference/memory/addressof.md)`(x)`で取得する

##例
```cpp
```

###出力
```
```

##参照
- [LWG Issue 2324. Insert iterator constructors should use `addressof()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2324)
