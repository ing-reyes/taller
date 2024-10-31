import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { SupplierEntity } from "./entities/supplier.entity";

@Injectable()
export class SuppliersService {

    private suppliers:SupplierEntity[] = [
        { id: 1, name: 'carlos', email: 'carlos@google.com', address: 'bobare', phone: '63262376', isActive: true },
        { id: 2, name: 'maria', email: 'maria@google.com', address: 'bobare', phone: '63262376', isActive: true },
        { id: 3, name: 'jose', email: 'jose@google.com', address: 'bobare', phone: '63262376', isActive: true },
        { id: 4, name: 'marla', email: 'marla@google.com', address: 'bobare', phone: '63262376', isActive: true },
    ];

    create( createSupplierDto: CreateSupplierDto ){
        try {
            const supplier:SupplierEntity = {
                ...createSupplierDto,
                isActive: true,
                id: this.suppliers.length+1,
            }

            this.suppliers.push(supplier);

            return supplier;
        } catch (error) {
            
        }
    }

    findAll(  ){
        return this.suppliers.filter((supplier)=>supplier.isActive===true);
    }

    findOne( id: number ){
        try {
            const supplier = this.suppliers.find((supplier) => supplier.id === id);
            if( !supplier ){
                throw new NotFoundException("Supplier not found");
            }
            return supplier;
        } catch (error) {
            throw error;
        }
    }

    update( id: number, updateSupplierDto: UpdateSupplierDto ){
        try {
            const indexSupplier = this.suppliers.findIndex((supplier)=>supplier.id===id && supplier.isActive===true );
            if( indexSupplier === -1 ){
                throw new NotFoundException("Supplier not found");
            }

            this.suppliers[indexSupplier] = {
                ...this.suppliers[indexSupplier],
                ...updateSupplierDto,
            }
            return this.suppliers[indexSupplier]
        } catch (error) {
            throw error;
        }
    }

    remove( id: number ){
        try {
            const indexSupplier = this.suppliers.findIndex((supplier)=>supplier.id===id && supplier.isActive===true );
            if( indexSupplier === -1 ){
                throw new NotFoundException("Supplier not found");
            }

            this.suppliers[indexSupplier] = {
                ...this.suppliers[indexSupplier],
                isActive: false,
            }
            
            return this.suppliers[indexSupplier]

        } catch (error) {
            throw error;
        }
    }
}