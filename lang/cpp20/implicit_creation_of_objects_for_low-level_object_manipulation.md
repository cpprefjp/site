# 未初期化領域への暗黙的なオブジェクト構築
* cpp20[meta cpp]

## 概要

`new`式ではなく`malloc()`等他の方法で確保されたメモリ領域には、明示的にオブジェクトの構築を行うまで想定する型のオブジェクトは生存期間内になく、そのアクセス（読み書き）は未定義動作となる。

```cpp
struct X {
  int a;
  int b;
};

X *make_x() {
  // malloc()はメモリの確保だけを行う
  X *p = (X*)malloc(sizeof(struct X));
  
  // pの領域にはオブジェクトが構築されていない
  p->a = 1; // 💀 UB
  p->b = 2; // 💀 UB

  return p;
}
```

この様なコードは純粋なC++では`new`式を用いることになり、その場合は問題ない。

```cpp
// new式を使用する場合
X *make_x() {
  // new式はメモリの確保とオブジェクト構築を行う
  X *p = new X;
  
  // pの領域にはオブジェクトが構築済
  p->a = 1; // ✅ ok
  p->b = 2; // ✅ ok

  return p;
}
```

一番最初の`malloc()`を用いるコードは主にCのコードと共有する部分で現れることがあり、Cでは問題ないもののC++コードとしてコンパイルした場合にのみ未定義動作となる。C++20からは、この様なコードのC/C++相互運用性向上のために、明示的にオブジェクトを構築する必要がないとみなすことのできる一部の型（*implicit-lifetime types*）に限って、未初期化領域へのアクセス時に暗黙的に（自動的に）オブジェクトが構築される様になり、未定義動作を回避できる様になる。

## 問題となる他の例

以下の例はこの変更によって解決される例であり、C++17以前は未定義動作となるものである。

### `operator new`

`new`式ではなく`operator new()`を直接使用する場合は同様の問題がある。

```cpp
// new式を使用する場合
X *make_x() {
  // operator new()はメモリの確保だけを行う
  X *p = (X*)::operator new(sizeof(struct X));
  
  // pの領域にはオブジェクトが構築されていない
  p->a = 1; // 💀 UB
  p->b = 2; // 💀 UB

  return p;
}
```

### 共用体のコピー

```cpp
union U {
  int n;
  float f;
};

float pun(int n) {
  // U::nの生存期間が開始
  U u = {.n = n};
  
  // このコピーではuのオブジェクト表現がコピーされるものの、メンバの生存期間は開始されない
  // そのため、アクティブメンバが無い状態となる
  U u2 = u;
  
  // u2.fは非アクティブ
  return u2.f; // 💀 UB
}
```

### バイト配列の読み込み

```cpp
// 何かバイト列ストリームを受け取って処理する関数とする
void process(Stream *stream) {
  // バイト配列の読み出し
  std::unique_ptr<char[]> buffer = stream->read();

  // 先頭バイトの状態によって分岐
  if (buffer[0] == FOO) {
    process_foo(reinterpret_cast<Foo*>(buffer.get())); // #1
  } else {
    process_bar(reinterpret_cast<Bar*>(buffer.get())); // #2
  }
}
```

1つの領域に複数の型のオブジェクトが同時に生存期間内にあることはないため、`stream->read()`が内部で`Foo, Bar`どちらかのオブジェクトを構築していたとしても、`#1`と`#2`のどちらかのパスは未定義動作となる。そして、この様なコードでは多くの場合、明示的にオブジェクトが構築されることはない。

### 動的配列の実装

```cpp
// std::vectorの様な動的配列型を実装したい
template<typename T>
struct Vec {
  char *buf = nullptr;
  char *buf_end_size = nullptr;
  char *buf_end_capacity = nullptr;

  void reserve(std::size_t n) {
    char *newbuf = (char*)::operator new(n * sizeof(T), std::align_val_t(alignof(T)));
    std::uninitialized_copy(begin(), end(), (T*)newbuf); // #a 💀 UB

    ::operator delete(buf, std::align_val_t(alignof(T)));
    buf_end_size = newbuf + sizeof(T) * size(); // #b 💀 UB
    buf_end_capacity = newbuf + sizeof(T) * n;  // #c 💀 UB
    buf = newbuf;
  }

  void push_back(T t) {
    if (buf_end_size == buf_end_capacity)
      reserve(std::max<std::size_t>(size() * 2, 1));
    new (buf_end_size) T(t);
    buf_end_size += sizeof(T); // #d 💀 UB
  }

  T *begin() { return (T*)buf; }

  T *end() { return (T*)buf_end_size; }

  std::size_t size() { return end() - begin(); } // #e 💀 UB
};

int main() {
  Vec<int> v;
  v.push_back(1);
  v.push_back(2);
  v.push_back(3);
  for (int n : v) { /*...*/ } // #f 💀 UB
}
```

C++においては、ポインタに対する演算（`+ -`など）はそのポインタが配列オブジェクトを指している場合にのみ有効となるが、例中の`#a #b #c #d #e #f`で使用されるポインタの指す領域にはいずれも配列オブジェクトが生存期間にない（正確には、非配列オブジェクトのポインタの場合は要素数1の配列として扱われるが、この例の場合はそれを満たすことはほぼなく、満たさないものとする）。そのため、そのポインタをイテレータの様に使用することは未定義動作となる。

## 仕様

### implicit-lifetime types

明示的にオブジェクトを構築する必要がないとみなすことのできる一部の型は*implicit-lifetime types*と呼ばれる次のいずれかに該当する型である

1. [スカラ型](/reference/type_traits/is_scalar.md)
2. 配列型
    - 要素型は問わない
3. *implicit-lifetime class types*
    - デストラクタがユーザー定義されていない集成体型、もしくは
    - 少なくとも1つの資格のあるトリビアルコンストラクタと、トリビアルで削除されていないデストラクタを持つ型
4. 1~3のCV修飾された型

### オブジェクトを暗黙的に構築する操作

標準ライブラリ中の次の関数は、*implicit-lifetime types*に対して使用した場合に、その振る舞いの一環として指定された領域内にそのオブジェクトを暗黙的に構築する

- `new`演算子
    - `opreator new`
    - `opreator new[]`
- アロケータ
    - [`std::allocator<T>::allocate`](/reference/memory/allocator/allocate.md)
- Cライブラリ関数
    - `std::aligned_alloc`
    - `std::calloc`
    - `std::malloc`
    - `std::realloc`
    - `std::memcpy`
    - `std::memmove`
- [`std::bit_cast`](/reference/bit/bit_cast.md)

これらの操作はそれぞれ、次のようにオブジェクトを暗黙的に構築する

- `new`演算子とCのメモリ確保関数
    - 返された領域にオブジェクトを構築し、構築された適切なオブジェクトへのポインタを返す
        - `calloc/realloc`の場合、暗黙的なオブジェクト構築はゼロ埋め/コピーが行われる前に行われる
- [`std::allocator::allocate`](/reference/memory/allocator/allocate.md)
    - 返された配列型の領域にその配列型のオブジェクトを構築するが、配列要素は構築されない
- `std::memcpy/std::memmove`
    - コピー先領域への暗黙的なオブジェクト構築は、コピー先領域にコピーをする前に行われる
- [`std::bit_cast`](/reference/bit/bit_cast.md)
    - ネストしたものも含めて、結果領域に暗黙にオブジェクトを構築する
        - ネストしたもの、とは例えばクラスメンバや配列の要素のこと

また、これらの操作に限らず、`char, unsigned char, std::byte`の配列オブジェクトを構築しその生存期間を開始する操作は、その配列オブジェクトが占有する領域内にその要素のオブジェクトを暗黙的に構築する。

### 暗黙的なオブジェクト構築

オブジェクトを暗黙的に構築する操作では、そうすることでプログラムが定義された振る舞いをするようになる（すなわち、未定義動作が回避できる）場合に、*implicit-lifetime types*の０個以上のオブジェクトを暗黙的に構築しその生存期間を開始させる。そのような、暗黙的なオブジェクト構築によってプログラムに定義された振る舞いをもたらすオブジェクトが１つも存在しない場合は未定義動作となる（これは今まで通り）。逆に、そのようなオブジェクトが複数存在している場合は、どのオブジェクトが暗黙的に構築されるかは未規定（これは、都度適切なオブジェクトが選択され構築されることを意図している）。

暗黙的なオブジェクト構築が行われる場合、そのサブオブジェクトの*implicit-lifetime types*のオブジェクトも暗黙的に構築され生存期間が開始されるが、*implicit-lifetime types*ではないオブジェクトは暗黙的に構築されないため明示的な初期化が必要となる。

暗黙的なオブジェクト構築を行わなくてもプログラムが定義された振る舞いをする（未定義動作とならない）場合、対象の操作は暗黙的にオブジェクトを構築せず、通常の効果のみをもたらす。

さらに、オブジェクトを暗黙的に構築する操作の内メモリを確保する関数等一部の操作では、暗黙的なオブジェクト構築によって作成されたオブジェクトを指す適切なポインタを返すことが規定される。これらの操作においては、そのポインタ値を返すことでプログラムが定義された振る舞いをするようになる場合に、指定された領域の先頭アドレスをアドレスとする暗黙的に構築されたオブジェクトの１つを選択し、そのオブジェクトを指すポインタ値を生成しそれを返す。そのような、プログラムに定義された振る舞いをもたらすようなポインタ値が存在しない場合は未定義動作となる。逆に、そのようなポインタ値が複数存在している場合は、どのポインタ値が生成されるかは未規定。

そのようなポインタ生成を行わなくてもプログラムが定義された振る舞いをする場合、そのようなポインタ値は生成されず、対象の操作は通常のポインタ値を返す。

### 擬似デストラクタ呼び出しによる生存期間の終了

一部の文脈では、スカラー型のオブジェクトに対してデストラクタ呼び出しを行うことができ、その場合のデストラクタ呼び出しのことを擬似デストラクタ呼び出し（*pseudo-destructor call*）と呼ぶ。

C++17まで、擬似デストラクタ呼び出しには何の効果もなかった（テンプレートの文脈でクラス型との構文上の互換性を取るためのものでしかなかった）が、C++20からは擬似デストラクタ呼び出しはそのスカラー型オブジェクトの生存期間を終了させることが規定される。

これに伴い、[`destroy_at()`](/reference/memory/destroy_at.md)などの擬似デストラクタ呼び出しと等価のことを行うライブラリ機能においても、スカラ型のオブジェクトの生存期間を終了させるようになる。

### これらの変更の影響

これらの変更はあくまでオブジェクト生存期間に関する規則を変更しただけに過ぎず、その影響はコンパイラ等の実装のオブジェクト生存期間の認識が変わるだけである。それによって、今まで未定義動作となっていたコードが未定義動作ではなくなり、未定義動作をトリガーとする最適化を受ける可能性が将来にわたって取り除かれることになる。

したがって、これらの変更によって最適化によるもの以外の実行時の振る舞いが変化することはなく、暗黙的なオブジェクト構築は実際にコンストラクタを呼んだり何か初期化を行うものではない。

## 例
(執筆中)
```cpp example
// (ここには、言語機能の使い方を解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)

#include <iostream>

int main()
{
  int variable = 0;
  std::cout << variable << std::endl;
}
```
* variable[color ff0000]

(コードブロック中の識別子に、文字色を付ける例です。)

### 出力
```
0
```

(ここには、サンプルコードの実行結果を記述します。何も出力がない場合は、項目を削除せず、空の出力にしてください。)  
(実行結果が処理系・実行環境によって異なる場合は、項目名を「出力例」に変更し、可能であればその理由も併記してください。)


## この機能が必要になった背景・経緯
(執筆中)


## 検討されたほかの選択肢
(執筆中)


## 関連項目

- [`start_lifetime_as()`](/reference/memory/start_lifetime_as.md.nolink)
- [`start_lifetime_as_array()`](/reference/memory/start_lifetime_as_array.md.nolink)
- [`is_implicit_lifetime`](/reference/type_traits/is_implicit_lifetime.md.nolink)

## 参照

- [P0593R6 Implicit creation of objects for low-level object manipulation](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p0593r6.html)
- [CWG Issue 2325. `std::launder` and reuse of character buffers](https://cplusplus.github.io/CWG/issues/2325.html)
- [CWG Issue 2605. Implicit-lifetime aggregates](https://cplusplus.github.io/CWG/issues/2605.html)
- [P1839R5 Accessing Object Representations](https://wg21.link/p1839r5)
