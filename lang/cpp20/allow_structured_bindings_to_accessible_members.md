# friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可 [P0969R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17までの構造化束縛では、publicアクセス指定されたメンバ変数のみ抽出できる仕様となっていた。

しかし実際には、friend指定された関数からであれば、privateアクセス指定されたメンバ変数にアクセスできるため、C++20では「構造化束縛を使用する文脈でアクセス可能なメンバ変数を抽出できる」という仕様に改訂された。


## 例
```cpp example
#include <iostream>

struct A {
  friend void foo();
private:
  int i = 3;
};

void foo() {
  A a;

  // メンバ変数iを取得する。
  // クラスAからfriend指定されているため、privateメンバ変数iにアクセスできる
  auto x = a.i; // C++17 : OK, C++20 : OK

  // 構造化束縛でメンバ変数を抽出する
  auto [y] = a; // C++17 : コンパイルエラー, C++20 : OK

  std::cout << x << std::endl;
  std::cout << y << std::endl;
}

int main() {
  foo();
}
```

### 出力
```
3
3
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)


## 参照
- [P0969R0 Allow structured bindings to accessible members](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0969r0.pdf)