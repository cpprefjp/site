# 評価されない文脈での定数式評価によって特殊メンバ関数がインスタンス化されることを規定 [P0859R0]
* cpp20[meta cpp]

<-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<-- last lang caution -->

## 概要
以前まで、デフォルトコンストラクタやムーブコンストラクタといった特殊メンバ関数は、odr-usedになった段階で定義される規定になっていた。しかし、`sizeof`や`decltype`のオペランドのような評価されない文脈においてはodr-usedにならないため、そのような文脈では特殊メンバ関数が使用できなかった。

```cpp
struct duration {
  constexpr duration() {}
  constexpr operator int() const { return 0; }
};

// duration d = duration(); // #1
int n = sizeof(short{duration(duration())});
```

上記プログラムはコンパイルエラーになる可能性がある。`sizeof`のオペランドで`duration`のムーブコンストラクタを実行しているが、`duration`クラスがodr-usedによってインスタンス化されていないため、ムーブコンストラクタがまだ定義されていないためである。

ここで #1のコメント行を有効にすることでこのプログラムは適格となる。

このような問題を解決するため、特殊メンバ関数が定義される条件が以下のように変更になった。

「`odr-used`もしくは潜在的に定数式評価される場合に特殊メンバ関数が定義される」

これによって、評価されない文脈で定数式評価した場合でも、特殊メンバ関数が利用可能となる。

この仕様は、2013年4月に欠陥報告された問題をC++20の規格書で解決したものである。問題が判明したあとコンパイラは早期に対応している可能性がある。


## 参照

- [CWG Issue 1581. When are constexpr member functions defined?](https://wg21.cmeerw.net/cwg/issue1581)
- [P0859R0: Core Issue 1581: When are constexpr member functions defined?](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0859r0.html)