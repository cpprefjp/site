#allocator
```cpp
namespace std {
  template<class T> class allocator;
  template<> class allocator<void>;
}
```

##概要
標準ライブラリ内では、主にコンテナがメモリの動的確保/解放を行っているが、メモリアロケータはプログラマが独自に実装しコンテナなどでアロケータとして使用できる。`allocator`クラスは、メモリアロケータの標準の実装を提供する。標準のコンテナやスマートポインタなどは、デフォルトで`allocator`クラスをメモリアロケータとして使用している。

###メンバ関数

| | |
|----------------------------|--------------------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `(destructor)` | デストラクタ |
| `operator=` | 代入演算子 |
| `address` | 変数のアドレスを取得する |
| `allocate` | メモリの確保 |
| `deallocate` | メモリの解放 |
| `max_size` | 一度に確保可能なメモリの最大サイズを取得 |
| `construct` | 引数を元にインスタンスを構築 |
| `destroy` | インスタンスの破棄 |


###メンバ型

| | |
|------------------------------|-------------------------------------------------------------------------|
| `size_type` | 要素数を表す符号なし整数型 `size_t` |
| `difference_type` | ポインタの差を表す符号あり整数型 `ptrdiff_t` |
| `pointer` | 要素のポインタ型 `T*` |
| `const_pointer` | 読み取り専用の要素のポインタ型 `const T*` |
| `reference` | 要素の参照型 `T&` |
| `const_reference` | 読み取り専用の要素の参照型 `const T&` |
| `value_type` | 要素の型 `T` |
| `rebind<U>` | 型`U`を確保するように再束縛する |


###非メンバ関数

| | |
|-------------------------|-----------------------------------------------------|
| `operator==` | 等値比較。常に`true`を返す |
| `operator!=` | 非等値比較。常に`false`を返す |


##例
```cpp
#include <memory>
#include <iostream>
#include <algorithm>

int main(int argc, char** argv) {
  auto alc = std::allocator<int>();

  // 10要素のint型が入る領域を確保
  int* arr = alc.allocate(10);

  // 確保した領域の各要素を構築する(コンストラクタを呼び出す)
  alc.construct(arr);

  std::iota(arr, arr + 10, 0);
  std::for_each(arr, arr + 10, [](int i) { std::cout << i << " "; });
  std::cout << std::endl;

  // 配列の各要素を破棄する(デストラクタを呼び出す)
  alc.destroy(arr);

  // 領域を解放する
  alc.deallocate(arr, 10);
}
```

###出力
```
0 1 2 3 4 5 6 7 8 9 
```

###参照

