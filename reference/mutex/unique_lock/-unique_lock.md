#デストラクタ
```cpp
~unique_lock();
```

##概要
ロックを手放す


##効果
`if (`[`owns_lock()`](./owns_lock.md)`) {` 
`  pm->unlock();` 
`}` 
※`pm`はメンバ変数として保持している、ミューテックスオブジェクトへのポインタ


##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


