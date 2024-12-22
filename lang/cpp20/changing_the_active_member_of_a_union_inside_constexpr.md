# 定数式内での共用体のアクティブメンバの変更を許可 [P1330R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++20より、共用体初期化後に別のメンバを初期化する事（アクティブメンバの切り替え）が定数式で行えるようになる。

```cpp example
union U {
  int n;
  float f;
};

constexpr int f() {
  // fをアクティブメンバとして初期化
  U u = { .f = 3.1415f };

  // u.nへアクティブメンバを切り替え、C++17まではコンパイルエラー
  u.n = 10;  

  return u.n;
}

int main() {
  static_assert(f() == 10);
}
```

ただし、非アクティブメンバの読み取りは未定義動作となり、定数式では許可されていない。

## この機能が必要になった背景・経緯

この提案の以前に、C++20で動的メモリ確保/解放が定数式で許可されており、各種コンテナをはじめとする標準ライブラリの多くのクラスを`constexpr`対応できるようになっていた。しかし、`std::string`や`std::optional`などのクラスはその実装に共用体が用いられており、そこでは共用体のアクティブメンバの切り替えが行われていたが、それは定数式で許可されていなかった。

静的リフレクション機能を見据えて`std::string`の`constexpr`対応が急がれており、その障壁を取り除くべく、共用体のアクティブメンバ切り替えは定数式で許可される事となった。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [可変サイズをもつコンテナの`constexpr`化](more_constexpr_containers.md)

## 参照

- [P1330R0 Changing the active member of a union inside constexpr](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1330r0.pdf)
- [P0980R1 Making std::string constexpr](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [std::stringのSSO(Small-string optimization)がどうなっているか調べた - melpon/qiita](https://github.com/melpon/qiita/tree/master/items/stdstringのSSO(Small-string%20optimization)がどうなっているか調べた)