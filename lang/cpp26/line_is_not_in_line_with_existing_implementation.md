# `#line`ディレクティブの制約を現実の実装に合わせて緩和する [P4136R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
`#line`ディレクティブは、後続のソース行の行番号を指定する。

```cpp
#line 100 "foo.cpp"
// 以降の行は、ファイル名"foo.cpp"の100行目から始まるものとして扱われる
```

C++26より前までは、行番号として`0`もしくは`2147483647`より大きい値を指定することが不適格と規定されていたが、これは現実の実装の振る舞いと合致していなかった。

C++26では、`[1, 2147483647]`の範囲外の行番号指定を、不適格ではなく「条件付きサポート (conditionally-supported)」とする。条件付きサポートとは、その指定を実装がサポートするかどうかが実装定義であり、サポートしない場合は診断 (コンパイルエラー) が必要となる、ことを意味する。

```cpp
#line 0          // 条件付きサポート (C++26より前では不適格)
#line 2147483648 // 条件付きサポート (C++26より前では不適格)
```

現実のコンパイラ実装の動作に合わせ、そのような仕様とする。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++26 プリプロセッサ仕様での「未定義動作」を不適格 (診断不要) に変更](preprocessing_is_never_undefined.md)
- [C++26 モジュール宣言より前での`#line`ディレクティブの使用を許可する](allow_line_before_module_declarations.md)


## 参照
- [P2843R3 Preprocessing is never undefined](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2843r3.pdf)
- [P4136R2 `#line` is not in line with existing implementation](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4136r2.pdf)
