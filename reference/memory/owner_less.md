#owner_less
```cpp
namespace std {
  template <class T>
  struct owner_less; // 先行宣言

  template <class T>
  struct owner_less<shared_ptr<T>>;

  template <class T>
  struct owner_less<weak_ptr<T>>;
}
```
* shared_ptr[link /reference/memory/shared_ptr.md]
* weak_ptr[link /reference/memory/weak_ptr.md]

##概要

(ここに、クラスの概要を記載する)


##shared_ptr版

###メンバ関数

| | |
|-------------------------|-----------------------------|
| `operator()` | 関数呼び出し演算子 |

###メンバ型

| | |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `result_type` | 戻り値型`bool` |
| `first_argument_type` | 第1引数型`[shared_ptr](/reference/memory/shared_ptr.md)<T>` |
| `second_argument_type` | 第2引数型`[shared_ptr](/reference/memory/shared_ptr.md)<T>` |

##weak_ptr版

###メンバ関数

| | |
|--------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `operator()` | 関数呼び出し演算子 |

###メンバ型

| | |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `result_type` | 戻り値型`bool` |
| `first_argument_type` | 第1引数型`[weak_ptr](/reference/memory/weak_ptr.md)<T>` |
| `second_argument_type` | 第2引数型`[weak_ptr](/reference/memory/weak_ptr.md)<T>` |


##例
```cpp
```

###出力
```cpp
##バージョン
```

###言語

- C++11:

###参照

