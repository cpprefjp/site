# 可変長データを扱うクラスの効率的なdelete [P0722R3]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<!-- last lang caution -->

## 概要

従来のクラススコープでの`operator delete`オーバーロードにおいて、オーバーロードされた`operator delete`が呼び出されるのはそのクラスのオブジェクトが破棄された後であり、そのオーバーロード内からはそのクラスのオブジェクト（及びメンバ）にアクセスすることはできなかった。

```cpp
#include <iostream>

struct S {
  std::string str;

  // #1 Sのための operator delete オーバーロード
  void operator delete(void* p) {
    // Sのオブジェクトは破棄済みのため、未定義動作となる
    const S* self = reinterpret_cast<const S*>(p);  // UB
    std::cout << self->str;   // UB

    // メモリ領域の解放
    ::operator delete(p);
  }
};

int main() {
  S* p = new S{};

  // Sのデストラクタ呼び出しの後#1が呼び出される
  delete p;
}
```

`delete`式は指定されたポインタの指しているオブジェクトを破棄した後にそのオブジェクトが占めていたメモリ領域を解放するが、`operator delete`のオーバーロードはオブジェクト破棄後のメモリ領域解放のみを担うため、`operator delete`のオーバーロードが呼ばれた時点でその対象の領域上のオブジェクトは生存期間を終えている。

C++20から、第ニ引数に[`std::destroying_delete_t`](/reference/new/destroying_delete_t.md)を取るように`operator delete`をオーバーロードすることで、`delete`式の行う全ての振る舞いをハンドリングできるようになり、`operator delete`のオーバーロード内から`delete`対象のオブジェクトに安全にアクセスすることができる。

```cpp
#include <iostream>
#include <new>
#include <memory>

struct S {
  std::string str;

  // #1 Sのための operator delete オーバーロード
  void operator delete(S* p, std::destroying_delete_t) {
    // pの指すオブジェクトはデストラクタ呼び出し前のため、安全に参照できる
    const S& self = *p;     // ok
    std::cout << self.str;  // ok

    // デストラクタ呼び出しをしなければならない
    std::destroy_at(p);
    // メモリ解放
    ::operator delete(p);
  }
};

int main() {
  S* p = new S{"test"};

  // Sのデストラクタは呼ばれずに#1が呼び出される
  delete p;
}
```
* std::destroying_delete_t[color ff0000]
* std::destroy_at[link /reference/memory/destroy_at.md]

このように、`std::destroying_delete_t`を取る`operator delete`のオーバーロードのことを*destroying operator delete*と呼ぶ。*destroying operator delete*においては、`delete`式が行う全てのことをユーザーが行う必要がある。

## 仕様

クラススコープで定義された`operator delete()`で、第二引数が`std::destroying_delete_t`であるものを*destroying operator delete*と呼ぶ。クラス`C`に対する*destroying operator delete*の第一引数は`C*`でなければならず、それらの点以外は通常の`operator delete`オーバーロードの制約に従う。

```cpp
struct S {
  // これらの宣言はいずれも、destroying operator deleteではない（コンパイルエラーとなる）
  void operator delete(void*, std::destroying_delete_t);      // 第一引数はS*
  void operator delete(S*, auto);                             // 第二引数は std::destroying_delete_t
  int* operator delete(S*, std::destroying_delete_t);         // 戻り値はvoid
  virtual void operator delete(S*, std::destroying_delete_t); // 仮想関数にできない
};
```

単一オブジェクトに対する`delete`式の実行に伴う`operator delete`の探索の結果、その候補の中に*destroying operator delete*が含まれている場合、*destroying operator delete*ではない`operator delete`は候補から外れる。

```cpp
struct S {
  // destroying operator delete
  void operator delete(S*, std::destroying_delete_t);

  // destroying operator deleteが定義されている限り、こちらが呼び出されることはない
  void operator delete(void*);
};
```

ただし、配列に対する`delete`式の場合は、*destroying operator delete*は考慮されない。

```cpp
struct S {
  // #1 destroying operator delete
  void operator delete(S* p, std::destroying_delete_t) {
    std::cout << "S::operator delete()\n";

    std::destroy_at(p);
    ::operator delete(p);
  }
};

int main() {
  S* p = new S[1]{};

  // #1は呼び出されず、要素ごとに破棄された後で配列の領域が解放される
  delete[] p;
}
```

また、配列板の`operator delete[]`を*destroying operator delete*としてオーバーロードすることもできない。

```cpp
struct S {
  void operator delete[](S* p, std::destroying_delete_t); // ng
};
```

単一オブジェクトに対する`delete`式においてそのオブジェクトの静的型と動的型が一致しない場合（つまり、基底クラスのポインタから派生クラスのオブジェクトを`delete`しようとする場合など）、その静的型はその動的型の基底クラスである必要があり両方の型に仮想デストラクタが必要となるが、*destroying operator delete*が`operator delete`として使用される場合にはその必要はない。したがって、*destroying operator delete*が使用されない場合に`delete`式が指定されたポインタの指す最も派生したオブジェクトを削除せず未定義動作になるような場合（仮想デストラクタの定義忘れなど）でも、*destroying operator delete*が使用された場合は未定義動作とならない（ただし、呼び出された*destroying operator delete*がそのオブジェクトを正しく破棄しない場合は未定義動作となりうる）。

*destroying operator delete*が`operator delete`として使用される`delete`式の実行において、`delete`式は`delete`対象オブジェクトのデストラクタを呼び出さないで`operator delete`を呼び出す。また、その際の*destroying operator delete*の第二引数（`std::destroying_delete_t`に対応する引数）に渡される値は未規定。

*destroying operator delete*に限らず全ての`operator delete`オーバーロードにおいて、`delete`式に指定されているポインタの指すオブジェクトがクラス型であり、そのデストラクタが仮想デストラクタである場合、その`delete`式の実行に伴う`operator delete`の探索はそのオブジェクトの動的型（実行時の実際のクラス型）のスコープで行われる。この探索は、クラスの仮想関数を基底クラスから呼び出す時と同じものである。

```cpp
// 基底クラス
struct B {
  virtual ~B();

  // 普通のdelete演算子オーバーロード
  void operator delete(void*, std::size_t);
};

// 派生クラス1
struct D : B {
  // 普通のdelete演算子オーバーロード
  void operator delete(void*);
};

// 派生クラス2
struct E : B {
  void log_deletion();

  // destroying operator delete
  void operator delete(E *p, std::destroying_delete_t) {
    p->log_deletion();
    p->~E();
    ::operator delete(p);
  }
};

void f() {
  B* bp = new D;
  delete bp; // #1 D::operator delete(void*)が呼び出される

  bp = new E;
  delete bp; // #2 E::operator delete(E*, std::destroying_delete_t)が呼び出される
}
```

`#1`において、`D`のオブジェクトは`delete`式によって破棄され、そのメモリ領域は`D::operator delete`によって解放される。  
`#2`において、`E`のオブジェクトの破棄とそのメモリ領域の解放は`E::operator delete`（*destroying operator delete*）によって行われる。

## 例

### 可変サイズクラスの`delete`

```cpp example
#include <iostream>
#include <string_view>
#include <string>
#include <new>
#include <memory>
#include <cstring>

class inlined_fixed_string {
  size_t length;

  inlined_fixed_string(size_t size, const char *data)
    : length(size)
  {
    // 自身の後ろにある領域に文字列をコピーする
    // P0593R6の効果によって、charオブジェクトの生存期間が自動開始される（C++20以降）
    std::memcpy(this + 1, data, size);
  }

public:
  inlined_fixed_string() = delete;

  auto size() const -> std::size_t {
    return length;
  }

  auto view() const -> std::string_view {
    // thisの後ろにはlength個のcharオブジェクトが生存期間内にあるため、このreinterpret_castは問題ない
    return { reinterpret_cast<const char*>(this + 1), this->size() };
  }

  // std::stringから構築するファクトリ関数
  static auto Make(const std::string& str) -> inlined_fixed_string* {
    // 自身の末尾に固定長（実行時可変長）の文字列用領域を確保する
    const std::size_t full_size = sizeof(inlined_fixed_string) + str.length() + 1;

    // パディングしたサイズでメモリの確保
    // new式ではなくグローバルnew演算子の呼出
    auto* p = ::operator new(full_size);

    // ログ出力
    std::cout << "inlined_fixed_string::Make() : " << full_size <<" byte allocate.\n";

    // 確保したメモリ領域にplacement newして構築
    // コンストラクタ内で文字列をコピー
    return ::new(p) inlined_fixed_string(str.length() + 1, str.c_str());
  }

  // 確保した領域を含めてdelete
  void operator delete(inlined_fixed_string* p, std::destroying_delete_t) {
    // 末尾領域の長さを取得
    const std::size_t full_size = sizeof(inlined_fixed_string) + p->length;

    // デストラクタ呼び出し
    std::destroy_at(p);

    // char（トリビアルに破棄可能な）型はデストラクタ呼び出しを省略可能
    std::ranges::destroy(p + 1, p + 1 + p->length + 1);

    // メモリ解放
    ::operator delete(p, full_size);
    
    // ログ出力
    std::cout << "inlined_fixed_string::operator delete() : " << full_size <<" byte deallocate.\n";
  }
};

int main() {
  std::string str = "C++20 destroying operator delete test.";
  auto* p = inlined_fixed_string::Make(str);

  std::cout << p->view() << "\n";

  delete p;
}
```
* destroying_delete_t[color ff0000]
* std::destroy_at[link /reference/memory/destroy_at.md]
* std::ranges::destroy[link /reference/memory/ranges_destroy.md]


#### 出力

```
inlined_fixed_string::Make() : 47 byte allocate.
C++20 destroying operator delete test.
inlined_fixed_string::operator delete() : 47 byte deallocate.
```

### 正しいデストラクタへのディスパッチ

```cpp example
#include <iostream>
#include <new>

// 仮想デストラクタを定義しない基底クラス
struct base {
  int kind = 0;

  // destroying operator delete宣言 #1
  void operator delete(base* p, std::destroying_delete_t);
};

struct derived1 : base {
  derived1() : base{1} {}
};

struct derived2 : base {
  derived2() : base{2} {}
};

// #1に対応する定義
void base::operator delete(base* p, std::destroying_delete_t) {

  switch(p->kind) {
    case 1:
    {
      auto* dp = static_cast<derived1*>(p);
      std::destroy_at(dp);
      ::operator delete(dp);
      std::cout << "destruct derived1\n";
      break;
    }
    case 2:
    {
      auto* dp = static_cast<derived2*>(p);
      std::destroy_at(dp);
      ::operator delete(dp);
      std::cout << "destruct derived2\n";
      break;
    }
    default:
      std::destroy_at(p);
      ::operator delete(p);
      std::cout << "destruct base\n";
  }
}

int main() {
  {
    base* p = new derived1{};
    // #1によってderived1のデストラクタが呼ばれ、メモリが解放される
    delete p;
  }
  {
    base* p = new derived2{};
    // #1によってderived2のデストラクタが呼ばれ、メモリが解放される
    delete p;
  }
}
```
* destroying_delete_t[color ff0000]
* std::destroy_at[link /reference/memory/destroy_at.md]

#### 出力

```
destruct derived1
destruct derived2
```

## この機能が必要になった背景・経緯

1つ目の例に挙げた`inlined_fixed_string`のような可変サイズクラスの定義は、ポインタの間接参照を回避しながら可変長配列を定義することができ、よく書かれるパターンだった（実際には*flexible array member*を使用することが多い）。

しかし、このようなクラスは[サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md)を活用して効率的に削除することができなかった。

`inlined_fixed_string`のオブジェクトを指すポインタを`s`とすると、`delete s;`という式の実行において、C++14（[CWG Issue 2248](https://cplusplus.github.io/CWG/issues/2248)解決前）のコンパイラは次のようなコードを呼び出す必要があった

```cpp
::operator delete(s, full_size);
```

しかし、この場合に自動で`full_size`を取得することはできない。

C++17では代わりに次のようなコードを出力する

```cpp
::operator delete(s, sizeof(inlined_fixed_string));
```

が、これは正しく確保したメモリ領域を解放していない。

正しくは、クラスで`operator delete`をオーバーロードする必要がある

```cpp
static void operator delete(void* ptr) {
  ::operator delete(ptr); // アロケータが知っているptrのサイズ情報に頼る（アロケータでそのサイズを求めるためのオーバーヘッドが発生しうる）
}
```

すなわち、サイズ付きデアロケーションを全く利用しない。これは安全に解放できるようになる一方で、サイズ付きデアロケーションのパフォーマンス上の利点を全て捨てることになる。

理想的には、クラスが保存している実際に確保したメモリのサイズを取得できることが望ましい

```cpp
static void operator delete(void* ptr) {
  inlined_fixed_string *s = reinterpret_cast<inlined_fixed_string*>(ptr); // UB
  std::size_t full_size = sizeof(inlined_fixed_string) + s->size();       // UB
  ::operator delete(ptr, full_size);
}
```

しかし、前述のように、この`operator delete`実行の前に`ptr`にあるオブジェクトは破棄されているため、これは未定義動作となる。

*destroying operator delete*は、この一番最後の`operator delete`相当のコードを安全にし、このような可変長クラスの`delete`を効率化するために導入された。

## 検討されたほかの選択肢

### `delete p`以外の削除メカニズム

*destroying operator delete*が必要となる場合に、`delete`式ではなく別のメカニズムによってオブジェクトの破棄とメモリ解放を行う方法が検討された。しかし、これに次のような欠点がある

- ユーザー定義型が組み込み型と同様に使用されるという原則に違反している
    - この方法の場合、`delete`式が使えなくなる
- 仮想デストラクタを持つ既存のクラス階層は、動的にクラスレイアウトの先頭/末尾に領域を拡張する派生クラスに対して透過的に拡張できない
- メモリ解放戦略のローカルな選択がコードの利用者にリークする
    - `std::unique_ptr`などにおいてはカスタムデリータを指定しなければならない
    - `std::make_unique`などは使用できない
    - リソース管理に`new/delete`を使用する多くのリソース管理クラスを使用できない

これらの欠点（特に、`delete`式が使用できないこと）によって、この方法は好まれなかった。

### destroying operator deleteの別の構文

*destroying operator delete*を宣言する構文として、いくつかの構文が検討された。

```cpp
struct S {
  // 1. void*の代わりにS*をとる
  void operator delete(S*);

  // 2. 1+~を先頭につける
  void operator ~delete(S*);

  // 3. デストラクタ風宣言
  ~S delete();
};
```

1. 通常の`operator delete`オーバーロードと区別がつきづらい
2. まだ通常の`operator delete`オーバーロードと区別がつきづらい
    - `~delete`は新しい演算子であるため可読性の問題がある
    - *destroying operator delete*は`delete`式の実行を完全にオーバーライドするものだが、異なる演算子オーバーロードになっていることによってそれを表現していない
3. デストラクタ風味の宣言によって、サブオブジェクト（メンバや基底クラス）のデストラクタが自動で呼ばれるという勘違いを招く可能性がある。
    - 加えて、2と同様の問題がある

結局、`std::destroying_delete_t`を第二引数に取る形が一番シンプルかつ可読性が高いとして採用された。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [C++14 サイズ付きデアロケーション](/lang/cpp14/sized_deallocation.md)
- [`std::destroying_delete_t`](/reference/new/destroying_delete_t.md)

## 参照

- [P0722R3 Efficient sized delete for variable sized classes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0722r3.html)
- [P0722R1 Efficient sized delete for variable sized classes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0722r1.html)
- [CWG Issue 2248. Problems with sized delete](https://cplusplus.github.io/CWG/issues/2248)