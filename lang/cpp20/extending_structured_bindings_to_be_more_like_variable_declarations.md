# 構造化束縛を拡張して通常の変数宣言のように使用できるようにする [P1091R3]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17で導入された構造化束縛宣言に指定しておけるのはCV修飾のみで、記憶域クラスや`constexpr`等を指定することは出来なかった。  
このため、`thread_local`指定の変数や`constexpr`変数などの初期化のために構造化束縛を用いることが出来なかった。

C++20ではこの制限が少し緩和され、構造化束縛宣言に`static`および`thread_local`を指定することができるようになり、それらの効果は通常の変数と同様となるようになった。  
すなわち、`static`指定では内部リンケージが与えられ、`thread_local`指定ではスレッドローカルストレージに配置されるようになり、どちらの場合もその構造化束縛宣言のなされているスコープに関わらず静的ストレージに配置される。

ただし、`inline`や`constexpr`、`constinit`等その他の指定は出来ず、指定された場合コンパイルエラーとなる。

また、C++17では構造化束縛宣言に指定した変数名をそのままラムダ式でキャプチャすることもできなかった。しかし、禁止しておく技術的な（コンパイラ実装上の）理由は無かったことから、この制限は撤廃された。  
これによって、構造化束縛の変数を通常の変数とほぼ同じようにラムダ式でキャプチャできるようになる。ただし、ビットフィールドを構造化束縛した変数は引き続き参照キャプチャできないため少し注意が必要である（詳しくは[構造化束縛した変数の参照キャプチャを許可](/lang/cpp20/reference_capture_of_structured_bindings.md)を参照のこと）。


## 例

### `static`と`thread_local`

```cpp example
#include <iostream>
#include <thread>
#include <random>
#include <utility>

//乱数エンジンを初期化し、最初の乱数値とともに返す
std::pair<std::mt19937, std::uint32_t> get_random() {
  std::mt19937 engine(std::random_device{}());
  auto first = engine();

  return {std::move(engine), first};
}

//static指定構造化束縛宣言
static auto [engin_static, value_static] = get_random();

//thread_local指定構造化束縛宣言
thread_local auto [engin_tls, value_tls] = get_random();


int main()
{
  std::cout << "---in main thread---" << std::endl;

  std::cout << "static value = " << value_static << std::endl;
  std::cout << "thread local value = " << value_tls << std::endl;

  //エンジンのアドレスを出力
  std::cout << "static engine = " << &engin_static << std::endl;
  std::cout << "thread local engine = " << &engin_tls << std::endl;

  std::thread th([]() {
    std::cout << "\n---in another thread---" << std::endl;

    std::cout << "static value = " << value_static << std::endl;
    std::cout << "thread local value = " << value_tls << std::endl;

    //エンジンのアドレスを出力
    std::cout << "static engine = " << &engin_static << std::endl;
    std::cout << "thread local engine = " << &engin_tls << std::endl;
  });

  th.join();
}
```

### 出力例
```
---in main thread---
static value = 3324737157
thread local value = 300715623
static engine = 0x6057a0
thread local engine = 0x7f01e57a2798

---in another thread---
static value = 3324737157
thread local value = 944600859
static engine = 0x6057a0
thread local engine = 0x7f01df50c358
```

シード値及びエンジンの配置アドレスは実行の度に変化するので、実行毎に異なる結果となる。

### ラムダ式によるキャプチャ
```cpp example
#include <iostream>
#include <tuple>

int main()
{
  auto tuple = std::make_tuple(1.0, 2.0, 3.0);
  auto& [a, b, c] = tuple;

  //コピーキャプチャ
  auto f_copy = [a, b, c]() {return a + b + c;};

  //参照キャプチャ
  auto f_ref  = [&a, &b, &c]() {return a + b + c;};

  std::cout << f_copy() << std::endl;
  std::cout << f_ref() << std::endl;

  a = 4.0;

  std::cout << f_copy() << std::endl;
  std::cout << f_ref() << std::endl;
}
```

### 出力
```
6
6
6
9
```

## 検討されたほかの選択肢

当初の提案では上記の3つだけではなく、リンケージ指定（`extern`）、`inline`指定、`constexpr`指定、`[[maybe_unused]]`属性指定、テンプレート、などもまとめて許可し、通常の変数との差異をほぼ完全に無くす予定であった。

しかし、`extern`による外部リンケージの指定は構造化束縛の仕様上意味が無く、それによって外部リンケージの有無で`inline`指定の可否の一貫性が無くなることから`inline`も許可されず、`constexpr`及びテンプレートについては変更範囲が広くなり詳細な検討が必要であることから見送られた。  
その結果、ラムダキャプチャの許可と`static`と`thread_local`指定のみが残ることとなった。

ただ、今回見送られた残りのものも将来的には許可される可能性がある。

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)
- [C++20 構造化束縛した変数の参照キャプチャを許可](/lang/cpp20/reference_capture_of_structured_bindings.md)


## 参照
- [P1091R0 Extending structured bindings to be more like variable declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1091r0.html)
- [P1091R1 Extending structured bindings to be more like variable declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1091r1.html)
- [P1091R2 Extending structured bindings to be more like variable declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1091r2.html)
- [P1091R3 Extending structured bindings to be more like variable declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1091r3.html)